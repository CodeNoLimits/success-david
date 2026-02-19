const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const clientsHtml = `
      <!-- RECENT CLIENTS -->
      <section class="recent-clients-section fade-in-up" style="margin: 4rem 0; text-align: center;">
        <div class="section-label" data-i18n="clients.label" style="justify-content: center; display: inline-flex;">Ils nous font confiance</div>
        <h2 class="section-title" data-i18n="clients.title">11 clients actifs | +82 projets | 5 langues</h2>
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; opacity: 0.6;">
          <h3 style="font-family: var(--font-display); color: var(--gold);">Keren Rabbi Yisrael</h3>
          <h3 style="font-family: var(--font-display); color: var(--gold);">Esther Ifra</h3>
          <h3 style="font-family: var(--font-display); color: var(--gold);">Barukh Sagit</h3>
          <h3 style="font-family: var(--font-display); color: var(--gold);">Kavkom Solar</h3>
          <h3 style="font-family: var(--font-display); color: var(--gold);">Terramind</h3>
        </div>
      </section>
`;

const waitlistHtml = `
    <!-- Newsletter CTA -->
    <section class="newsletter-section" style="background:linear-gradient(135deg,rgba(212,175,55,0.06),rgba(28,25,23,0.5));border:1px solid rgba(212,175,55,0.2);border-radius:20px;padding:3rem 2rem;text-align:center;margin:4rem auto; max-width: 1400px; display: block;">
      <div class="newsletter-eyebrow" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.25rem 0.9rem;background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.2);border-radius:20px;color:var(--gold);font-size:0.72rem;font-weight:600;font-family:var(--font-display);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1.25rem">📧 Restez informé</div>
      <h2 class="newsletter-title" style="font-family:var(--font-display);font-size:clamp(1.5rem,4vw,2.25rem);font-weight:800;color:var(--text-primary);margin-bottom:0.75rem">Recevez nos offres & actualités</h2>
      <p class="newsletter-sub" style="color:var(--text-secondary);max-width:480px;margin:0 auto 2rem;font-size:0.95rem">Nouvelles fonctionnalités, promotions exclusives et études de cas. Zéro spam.</p>
      <form class="newsletter-form" action="https://formsubmit.co/dreamnovaultimate@gmail.com" method="POST" style="display:flex;gap:0.75rem;max-width:480px;margin:0 auto;flex-wrap:wrap;justify-content:center">
        <input type="hidden" name="_subject" value="Nouvelle inscription Waitlist/Newsletter">
        <input type="hidden" name="_captcha" value="false">
        <input type="email" name="email" class="newsletter-input" placeholder="votre@email.com" required style="flex:1;min-width:220px;padding:0.75rem 1.25rem;background:rgba(12,10,9,0.8);border:1px solid rgba(245,158,11,0.18);border-radius:50px;color:#F5F5F4;font-family:Inter,sans-serif;font-size:0.9rem;outline:none;">
        <button type="submit" class="newsletter-btn" style="padding:0.75rem 1.75rem;background:linear-gradient(135deg,#D4AF37,#F59E0B);color:#0C0A09;font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:0.9rem;border:none;border-radius:50px;cursor:pointer;">S'inscrire →</button>
      </form>
    </section>
`;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add waitlist before footer
  if (!html.includes('Recevez nos offres') && file !== 'index.html') {
    html = html.replace(/<footer class="site-footer">/, waitlistHtml + '\\n<footer class="site-footer">');
    modified = true;
  }

  // Add Recent Clients to index.html
  if (file === 'index.html' && !html.includes('Ils nous font confiance')) {
    html = html.replace(/<!-- CHARTS -->/, clientsHtml + '\\n      <!-- CHARTS -->');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Updated ' + file);
  }
});

console.log('Batch 8.3 and 8.4 complete.');
