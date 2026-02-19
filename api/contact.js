// Vercel serverless function — contact form
// Requires RESEND_API_KEY env var on Vercel dashboard
// Set it at: https://vercel.com/dream-ais-projects/dreamnova-bible-site/settings/environment-variables

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic validation
  const { name, email, message, devis_ref, amount } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  // Guard: RESEND_API_KEY must be set
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'DreamNova Devis <devis@dreamnova.vercel.app>',
        to: ['dreamnovaultimate@gmail.com'],
        reply_to: email,
        subject: `[DEVIS ${devis_ref || 'N/A'}] ${name} — ${amount || 'N/A'}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0C0A09;color:#F5F5F4;padding:32px;border-radius:12px;border:1px solid rgba(212,175,55,0.3)">
            <h2 style="color:#D4AF37;margin-bottom:24px;font-size:22px">⬡ Nouveau devis DreamNova</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#A8A29E;width:140px">Nom</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#A8A29E">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08)"><a href="mailto:${email}" style="color:#F59E0B">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#A8A29E">Réf. devis</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#D4AF37;font-weight:700">${devis_ref || 'N/A'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#A8A29E">Montant</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-weight:700;font-size:18px;color:#D4AF37">${amount || 'N/A'}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:rgba(245,158,11,0.06);border-left:3px solid #F59E0B;border-radius:0 8px 8px 0">
              <div style="color:#A8A29E;font-size:13px;margin-bottom:8px">Message :</div>
              <div style="color:#F5F5F4;line-height:1.6;white-space:pre-wrap">${message || '(aucun message)'}</div>
            </div>
            <div style="margin-top:24px;font-size:12px;color:#78716C;text-align:center">
              DreamNova · Jerusalem, Israël · Na Nach Nachman MeUman
            </div>
          </div>
        `
      })
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('Resend API error:', err);
      return res.status(500).json({ ok: false, error: 'Email send failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}
