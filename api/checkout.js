// Stripe Checkout — direct REST call (no SDK, avoids Vercel connectivity issues)
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { amount, description, email } = req.body;

  if (!amount || amount < 50) {
    return res.status(400).json({ error: 'Montant minimum: 50€' });
  }

  const sk = process.env.STRIPE_SECRET_KEY;
  if (!sk) return res.status(500).json({ error: 'Stripe non configuré' });

  const host = req.headers.host || 'dreamnova-bible-site.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // Build URL-encoded body for Stripe REST API
  const params = new URLSearchParams();
  params.append('payment_method_types[]', 'card');
  params.append('line_items[0][price_data][currency]', 'eur');
  params.append('line_items[0][price_data][product_data][name]', description || 'Devis DreamNova');
  params.append('line_items[0][price_data][unit_amount]', String(Math.round(amount * 100)));
  params.append('line_items[0][quantity]', '1');
  params.append('mode', 'payment');
  params.append('success_url', `${baseUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`);
  params.append('cancel_url', `${baseUrl}/devis.html?cancelled=true`);
  if (email) params.append('customer_email', email);

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sk}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.url) {
      return res.status(200).json({ url: data.url });
    } else {
      console.error('Stripe error:', JSON.stringify(data.error));
      return res.status(500).json({ error: data.error?.message || 'Erreur Stripe' });
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
