import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SIZES, calculatePrice } from "../utils/pricing";
import PaymentForm from "./PaymentForm";

const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = envKey ? loadStripe(envKey) : null;

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function CheckoutPanel({ exportDesigns }) {
  const [sizes, setSizes] = useState([{ size: "M", quantity: 1 }]);
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [step, setStep] = useState("form"); // form | payment | success
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const totalPrice = calculatePrice(sizes);
  const totalQty = sizes.reduce((sum, s) => sum + s.quantity, 0);

  const addSizeRow = () => {
    const used = new Set(sizes.map((s) => s.size));
    const next = SIZES.find((sz) => !used.has(sz)) || "M";
    setSizes([...sizes, { size: next, quantity: 1 }]);
  };

  const removeSizeRow = (idx) => {
    if (sizes.length <= 1) return;
    setSizes(sizes.filter((_, i) => i !== idx));
  };

  const updateSize = (idx, field, value) => {
    const next = [...sizes];
    next[idx] = { ...next[idx], [field]: value };
    setSizes(next);
  };

  const handleCheckout = async () => {
    setError("");
    const validSizes = sizes.filter((s) => s.quantity > 0);
    if (validSizes.length === 0) {
      setError("Add at least one size with quantity > 0");
      return;
    }
    if (!email?.trim()) {
      setError("Email is required");
      return;
    }
    if (!customerName?.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    try {
      const { front, back } = await exportDesigns();
      if (!front && !back) {
        throw new Error("Please add a design to the front or back before checkout.");
      }

      let designFront = "";
      let designBack = "";
      const designFrontObj = { fileUrl: "", publicId: "" };
      const designBackObj = { fileUrl: "", publicId: "" };

      if (front) {
        const uploadRes = await fetch(`${API_BASE}/api/uploads/design`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: front,
            fileName: "front-design.png",
            customerEmail: email.trim(),
          }),
        });
        if (!uploadRes.ok) throw new Error("Failed to upload front design");
        const { fileUrl, publicId } = await uploadRes.json();
        designFront = fileUrl;
        designFrontObj.fileUrl = fileUrl;
        designFrontObj.publicId = publicId;
      }

      if (back) {
        const uploadRes = await fetch(`${API_BASE}/api/uploads/design`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: back,
            fileName: "back-design.png",
            customerEmail: email.trim(),
          }),
        });
        if (!uploadRes.ok) throw new Error("Failed to upload back design");
        const { fileUrl, publicId } = await uploadRes.json();
        designBack = fileUrl;
        designBackObj.fileUrl = fileUrl;
        designBackObj.publicId = publicId;
      }

      const intentRes = await fetch(`${API_BASE}/api/payments/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sizes: validSizes,
          email: email.trim(),
          customerName: customerName.trim(),
          designFront,
          designBack,
        }),
      });
      if (!intentRes.ok) {
        const err = await intentRes.json();
        throw new Error(err.error || "Failed to create payment");
      }
      const { clientSecret, paymentIntentId, amount } = await intentRes.json();

      setPaymentData({
        clientSecret,
        paymentIntentId,
        amount,
        designFront: designFrontObj,
        designBack: designBackObj,
      });
      setStep("payment");
    } catch (err) {
      setError(err.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email.trim(),
          customerName: customerName.trim(),
          designFront: paymentData.designFront,
          designBack: paymentData.designBack,
          stripePaymentIntentId: paymentData.paymentIntentId,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create order");
      }
      const data = await res.json();
      setOrderId(data.orderId);
      setStep("success");
    } catch (err) {
      setError(err.message || "Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="checkout-panel checkout-success">
        <h3 className="checkout-title">Order confirmed</h3>
        <p>Thank you for your order{orderId ? ` #${orderId}` : ""}.</p>
        <p>You will receive a confirmation email shortly.</p>
      </div>
    );
  }

  if (step === "payment") {
    if (!stripePromise) {
      return (
        <div className="checkout-panel checkout-payment">
          <h3 className="checkout-title">Complete payment</h3>
          <p className="payment-error">
            Payment is temporarily unavailable because the Stripe publishable key is not configured.
          </p>
          <div className="payment-actions">
            <button type="button" className="payment-back" onClick={() => setStep("form")}>
              Back
            </button>
          </div>
        </div>
      );
    }

    const options = {
      clientSecret: paymentData.clientSecret,
      appearance: { theme: "stripe" },
    };
    return (
      <div className="checkout-panel checkout-payment">
        <h3 className="checkout-title">Complete payment</h3>
        <p className="checkout-amount">Total: ${paymentData.amount ?? totalPrice}</p>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm
            onSuccess={handlePaymentSuccess}
            onBack={() => setStep("form")}
            loading={loading}
          />
        </Elements>
      </div>
    );
  }

  return (
    <div className="checkout-panel">
      <h3 className="checkout-title">Checkout</h3>

      <div className="checkout-section">
        <label>Sizes & quantities</label>
        {sizes.map((row, idx) => (
          <div key={idx} className="checkout-size-row">
            <select
              value={row.size}
              onChange={(e) => updateSize(idx, "size", e.target.value)}
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              max="99"
              value={row.quantity}
              onChange={(e) => updateSize(idx, "quantity", parseInt(e.target.value, 10) || 1)}
            />
            <button
              type="button"
              className="checkout-remove"
              onClick={() => removeSizeRow(idx)}
              disabled={sizes.length <= 1}
              aria-label="Remove size"
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" className="checkout-add-size" onClick={addSizeRow}>
          + Add size
        </button>
      </div>

      <div className="checkout-preview">
        <span>Price preview:</span>
        <strong>${totalPrice.toFixed(2)}</strong>
        {totalQty > 0 && (
          <span className="checkout-qty">({totalQty} shirt{totalQty !== 1 ? "s" : ""})</span>
        )}
      </div>

      <div className="checkout-section">
        <label htmlFor="checkout-email">Email</label>
        <input
          id="checkout-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="checkout-section">
        <label htmlFor="checkout-name">Full name</label>
        <input
          id="checkout-name"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      {error && <p className="checkout-error">{error}</p>}

      <button
        type="button"
        className="checkout-button"
        onClick={handleCheckout}
        disabled={loading || totalPrice <= 0}
      >
        {loading ? "Preparing…" : "Proceed to payment"}
      </button>
    </div>
  );
}
