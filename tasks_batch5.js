const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, 'portfolio.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const imgDir = path.join(__dirname, 'img', 'portfolio');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// 5.2 Stats Dynamiques
if (!$('.portfolio-stats').length) {
  $('.filter-tabs').before(`
    <div class="portfolio-stats fade-in-up" style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem; text-align: center;">
      <div class="stat-item" style="background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); padding: 1rem 2rem; border-radius: 16px; min-width: 150px;">
        <div class="stat-num" data-target="46" style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: var(--gold); margin-bottom: 0.5rem; line-height: 1;">0</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;" data-i18n="stats.projects">Projets</div>
      </div>
      <div class="stat-item" style="background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); padding: 1rem 2rem; border-radius: 16px; min-width: 150px;">
        <div class="stat-num" data-target="11" style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: var(--gold); margin-bottom: 0.5rem; line-height: 1;">0</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;" data-i18n="stats.clients">Clients</div>
      </div>
      <div class="stat-item" style="background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); padding: 1rem 2rem; border-radius: 16px; min-width: 150px;">
        <div class="stat-num" data-target="82" style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: var(--gold); margin-bottom: 0.5rem; line-height: 1;">0</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;" data-i18n="stats.vercel">Déploiements Vercel</div>
      </div>
      <div class="stat-item" style="background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); padding: 1rem 2rem; border-radius: 16px; min-width: 150px;">
        <div class="stat-num" data-target="5" style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: var(--gold); margin-bottom: 0.5rem; line-height: 1;">0</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;" data-i18n="stats.languages">Langues</div>
      </div>
    </div>
  `);
}

// 5.3 Recherche / Filtre avance
if (!$('.search-bar-wrap').length) {
  $('.filter-tabs').before(`
    <div class="search-bar-wrap fade-in-up" style="display: flex; justify-content: center; margin-bottom: 2rem;">
      <input type="text" id="projectSearch" placeholder="Rechercher un projet..." data-i18n="portfolio.search_placeholder" style="width: 100%; max-width: 500px; padding: 1rem 1.5rem; border-radius: 50px; border: 1px solid var(--border); background: rgba(28, 25, 23, 0.6); color: var(--text-primary); font-family: var(--font-body); font-size: 0.95rem; outline: none; transition: all 0.3s; backdrop-filter: blur(10px);">
    </div>
  `);

  $('head').append(`
<style>
#projectSearch:focus { border-color: var(--border-hover); box-shadow: 0 0 20px rgba(212, 175, 55, 0.15); background: rgba(28, 25, 23, 0.9); }
.project-img-wrap { width: 100%; height: 200px; overflow: hidden; border-radius: 8px; margin-bottom: 1.25rem; background: var(--bg-secondary); border: 1px solid rgba(255,255,255,0.05); }
.project-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; border-radius: 8px; }
.project-card:hover .project-img { transform: scale(1.05); }
</style>
  `);
  
  $('body').append(`
<script>
const animateCounters = () => {
  document.querySelectorAll('.stat-num').forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = 200;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const statsObs = new IntersectionObserver((entries) => {
  if(entries[0].isIntersecting) {
    animateCounters();
    statsObs.disconnect();
  }
}, {threshold: 0.5});
if(document.querySelector('.portfolio-stats')) {
  statsObs.observe(document.querySelector('.portfolio-stats'));
}

const searchBox = document.getElementById('projectSearch');
if (searchBox) {
  searchBox.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const activeTab = document.querySelector('.filter-tab.active');
    let activeCat = 'all';
    
    if (activeTab && activeTab.getAttribute('onclick')) {
      const match = activeTab.getAttribute('onclick').match(/'([^']+)'/);
      if (match) activeCat = match[1];
    }
    
    document.querySelectorAll('.project-card').forEach(card => {
      const text = card.innerText.toLowerCase();
      const cat = card.getAttribute('data-category') || '';
      const isActiveTab = activeCat === 'all' || cat.includes(activeCat);
      
      if (text.includes(term) && isActiveTab) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

const originalFilter = filterProjects;
window.filterProjects = function(cat) {
  originalFilter(cat);
  const term = (document.getElementById('projectSearch')?.value || '').toLowerCase();
  if (term) {
     document.getElementById('projectSearch').dispatchEvent(new Event('input'));
  }
}
</script>
  `);
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const tasks = [];
  
  $('.project-card').each((i, elem) => {
    const url = $(elem).attr('href');
    if (!url || !url.startsWith('http')) return;
    
    let slug = url.split('://')[1].replace(/[^a-z0-9]/gi, '_').toLowerCase();
    // remove trailing underscores
    slug = slug.replace(/_+$/, '');
    
    if ($(elem).find('.project-img-wrap').length === 0) {
      $(elem).prepend('<div class="project-img-wrap"><img src="/img/portfolio/' + slug + '.webp" alt="Screenshot" loading="lazy" class="project-img"></div>');
    }
    
    const imgDest = path.join(imgDir, slug + '.webp');
    if (!fs.existsSync(imgDest)) {
      tasks.push(async () => {
        try {
          console.log('Capturing: ' + url);
          const page = await browser.newPage();
          await page.setViewport({ width: 1200, height: 630 });
          await page.goto(url, { waitUntil: 'load', timeout: 30000 });
          await new Promise(r => setTimeout(r, 2000));
          await page.screenshot({ path: imgDest, type: 'webp', quality: 80 });
          await page.close();
          console.log('Done: ' + url);
        } catch (e) {
          console.log('Failed: ' + url, e.message);
        }
      });
    }
  });
  
  const concurrency = 3;
  for (let i = 0; i < tasks.length; i += concurrency) {
    const chunk = tasks.slice(i, i + concurrency);
    await Promise.all(chunk.map(c => c()));
  }
  
  await browser.close();
  
  fs.writeFileSync(htmlPath, $.html({ decodeEntities: false }), 'utf8');
  console.log('portfolio.html updated with screenshots, stats and search!');
})();
