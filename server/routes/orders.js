import express from "express";
import Order from "../models/Order.js";
import Stripe from "stripe";

const router = express.Router();

// Middleware to check admin token
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Confirm order after redirect (e.g. 3DS) - creates order from PaymentIntent metadata only
router.post("/confirm", async (req, res) => {
  try {
    const { stripePaymentIntentId } = req.body;
    if (!stripePaymentIntentId) {
      return res.status(400).json({ error: "Missing stripePaymentIntentId" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ error: `Payment not confirmed. Status: ${paymentIntent.status}` });
    }
    const metadata = paymentIntent.metadata;
    const order = new Order({
      customerEmail: metadata.email,
      customerName: metadata.customerName,
      designFront: metadata.designFront ? { fileUrl: metadata.designFront, publicId: "" } : undefined,
      designBack: metadata.designBack ? { fileUrl: metadata.designBack, publicId: "" } : undefined,
      sizes: JSON.parse(metadata.sizes),
      totalPrice: parseFloat(metadata.calculatedPrice),
      stripePaymentId: stripePaymentIntentId,
      status: "paid",
    });
    await order.save();
    res.status(201).json({ success: true, orderId: order._id });
  } catch (err) {
    console.error("Order confirm error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Create order (ONLY after verified payment - used when payment completes in-page)
router.post("/", async (req, res) => {
  try {
    const { customerEmail, customerName, designFront, designBack, stripePaymentIntentId } = req.body;

    if (!customerEmail || !customerName || !stripePaymentIntentId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // VERIFY payment with Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
    
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ 
        error: `Payment not confirmed. Status: ${paymentIntent.status}. Contact support if this is an error.` 
      });
    }

    // Extract metadata (all verified by Stripe)
    const metadata = paymentIntent.metadata;
    const storedPrice = parseFloat(metadata.calculatedPrice);
    const storedSizes = JSON.parse(metadata.sizes);
    const storedDesignFront = metadata.designFront;
    const storedDesignBack = metadata.designBack;

    // Verify designs match what customer paid for (support object or string)
    const designFrontUrl = typeof designFront === "object" ? designFront?.fileUrl : designFront;
    const designBackUrl = typeof designBack === "object" ? designBack?.fileUrl : designBack;
    if (storedDesignFront && storedDesignFront !== (designFrontUrl || "")) {
      return res.status(400).json({ error: "Front design does not match payment intent" });
    }
    if (storedDesignBack && storedDesignBack !== (designBackUrl || "")) {
      return res.status(400).json({ error: "Back design does not match payment intent" });
    }

    // Create order with verified payment and sizes from metadata
    const order = new Order({
      customerEmail,
      customerName,
      designFront: typeof designFront === "object" ? designFront : { fileUrl: designFront, publicId: "" },
      designBack: typeof designBack === "object" ? designBack : { fileUrl: designBack, publicId: "" },
      sizes: storedSizes,
      totalPrice: storedPrice,
      stripePaymentId: stripePaymentIntentId,
      status: "paid"
    });

    await order.save();
    res.status(201).json({ success: true, orderId: order._id });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (admin only)
router.get("/", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get single order by ID
router.get("/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (admin only)
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "paid", "processing", "shipped", "cancelled"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete order (admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
