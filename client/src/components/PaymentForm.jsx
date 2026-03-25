import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm({ onSuccess, onBack, loading }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

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
