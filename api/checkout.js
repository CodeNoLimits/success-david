const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: description || 'Devis DreamNova' },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    customer_email: email || undefined,
    success_url: 'https://dreamnova-bible-site.vercel.app/devis.html?paid=true',
    cancel_url: 'https://dreamnova-bible-site.vercel.app/devis.html?cancelled=true',
  });

  res.status(200).json({ url: session.url });
};
