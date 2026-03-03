import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm({ onSuccess, onBack, loading }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // #region agent log
  (() => {
    const stripeType = typeof stripe;
    const stripeIsNull = stripe === null;
    const stripeIsUndefined = stripe === undefined;
    const el = elements;
    const elementsType = typeof el;
    const elementsIsNull = el === null;
    const payload = {
      sessionId: "cf161d",
      location: "PaymentForm.jsx:8",
      message: "PaymentForm mount - Stripe hook check",
      data: { stripeType, stripeIsNull, stripeIsUndefined, elementsType, elementsIsNull },
      timestamp: Date.now(),
      runId: "run1",
      hypothesisId: "B,E",
    };
    fetch("http://127.0.0.1:7329/ingest/8d976868-4a3c-4f71-8e2d-77bf0dc8a368", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "cf161d" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  })();
  // #endregion

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setError("");
    setProcessing(true);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Payment form error");
        setProcessing(false);
        return;
      }
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/designer`,
        },
      });
      if (confirmError) {
        setError(confirmError.message || "Payment failed");
        setProcessing(false);
        return;
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      {error && <p className="payment-error">{error}</p>}
      <div className="payment-actions">
        <button type="button" className="payment-back" onClick={onBack} disabled={processing}>
          Back
        </button>
        <button type="submit" className="payment-submit" disabled={!stripe || processing || loading}>
          {processing || loading ? "Processing…" : "Pay now"}
        </button>
      </div>
    </form>
  );
}
