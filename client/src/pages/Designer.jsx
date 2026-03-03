import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import TShirtDesigner from "../components/TShirtDesigner";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function Designer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [redirectOrderId, setRedirectOrderId] = useState(null);

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status");
    if (paymentIntent && redirectStatus === "succeeded") {
      fetch(`${API_BASE}/api/orders/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripePaymentIntentId: paymentIntent }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.orderId) setRedirectOrderId(data.orderId);
          setSearchParams({}, { replace: true });
        })
        .catch(() => setSearchParams({}, { replace: true }));
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      {redirectOrderId && (
        <div className="order-success-banner" role="alert">
          Order #{redirectOrderId} confirmed. Thank you for your purchase!
        </div>
      )}
      <TShirtDesigner />
    </>
  );
}
