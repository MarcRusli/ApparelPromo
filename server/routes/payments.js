import express from "express";
import Stripe from "stripe";

const router = express.Router();

const BASE_PRICE = 15;
const SIZE_MULTIPLIERS = {
  "XS": 1,
  "S": 1,
  "M": 1.05,
  "L": 1.1,
  "XL": 1.2,
  "2XL": 1.3,
  "3XL": 1.4
};

// Helper function to calculate price
function calculatePrice(sizes) {
  let total = 0;
  sizes.forEach(item => {
    const multiplier = SIZE_MULTIPLIERS[item.size] || 1;
    total += BASE_PRICE * multiplier * item.quantity;
  });
  return parseFloat(total.toFixed(2));
}

router.post("/create-intent", async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { sizes, email, customerName, designFront, designBack } = req.body;

    if (!sizes || !email || !customerName) {
      return res.status(400).json({ error: "Missing required fields: sizes, email, customerName" });
    }

    // BACKEND calculates price (not frontend)
    const calculatedPrice = calculatePrice(sizes);

    if (calculatedPrice <= 0) {
      return res.status(400).json({ error: "Invalid price calculated" });
    }

    // Create payment intent with metadata to verify later
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(calculatedPrice * 100), // convert to cents
      currency: "usd",
      receipt_email: email,
      metadata: {
        email,
        customerName,
        sizes: JSON.stringify(sizes),
        calculatedPrice,
        designFront: designFront || "",
        designBack: designBack || ""
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: calculatedPrice
    });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
