const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  let modified = false;

  const title = $('title').text() || 'DreamNova';
  const desc = $('meta[name="description"]').attr('content') || 'Projets e-commerce, sites vitrine et SaaS livrés avec excellence par DreamNova.';
  const url = `https://dreamnova-bible-site.vercel.app/${file === 'index.html' ? '' : file}`;

  // Add description if missing
  if (!$('meta[name="description"]').length) {
    $('head').append(`\\n    <meta name="description" content="${desc}">`);
    modified = true;
  }

  // Add OpenGraph
  if (!$('meta[property="og:title"]').length) {
    $('head').append(`\\n    <meta property="og:title" content="${title}">`);
    modified = true;
  }
  if (!$('meta[property="og:description"]').length) {
    $('head').append(`\\n    <meta property="og:description" content="${desc}">`);
    modified = true;
  }
  if (!$('meta[property="og:image"]').length) {
    $('head').append(`\\n    <meta property="og:image" content="https://dreamnova-bible-site.vercel.app/img/screenshot.jpg">`);
    modified = true;
  }
  if (!$('meta[property="og:url"]').length) {
    $('head').append(`\\n    <meta property="og:url" content="${url}">`);
    modified = true;
  }
  if (!$('meta[name="twitter:card"]').length) {
    $('head').append(`\\n    <meta name="twitter:card" content="summary_large_image">`);
    modified = true;
  }
  if (!$('link[rel="canonical"]').length) {
    $('head').append(`\\n    <link rel="canonical" href="${url}">`);
    modified = true;
  }
  if (!$('link[rel="manifest"]').length) {
    $('head').append(`\\n    <link rel="manifest" href="/manifest.json">`);
    modified = true;
  }

  // Add lazy loading
  $('img').each((i, el) => {
    if (!$(el).attr('loading')) {
      $(el).attr('loading', 'lazy');
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, $.html({ decodeEntities: false }), 'utf8');
    console.log('Updated SEO/Performance for ' + file);
  }
});

console.log('SEO & Performance updates complete.');
