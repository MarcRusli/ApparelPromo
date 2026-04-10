// Must match server/routes/payments.js exactly for preview accuracy
const BASE_PRICE = 15;
const SIZE_MULTIPLIERS = {
  XS: 1,
  S: 1,
  M: 1.05,
  L: 1.1,
  XL: 1.2,
  "2XL": 1.3,
  "3XL": 1.4,
};

export const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

export function roundToNearestFiveCents(amount) {
  return Math.round(amount * 20) / 20;
}

export function getScreenPrintQuotePerShirt(
  blankCost,
  quantity,
  frontColors,
  backColors,
) {
  if (frontColors == 0 && backColors == 0) {
    return 0;
  }

  const A = 79.7022;
  const B = 4.2413;
  const C = 0.0;
  const D = 1.7353;
  const E = 0.8655;
  const L = 1.0;
  const K = 0.0;

  let costF = 0;
  let costB = 0;
  if (frontColors > 0) {
    costF = D + E * (frontColors - 1);
  }
  if (backColors > 0) {
    costB = D + E * (backColors - 1);
  }

  const basePrice =
    blankCost +
    (A + B * (frontColors + backColors)) / quantity +
    C +
    costF +
    costB;
  const discount = L + (1 - L) * Math.exp(-K * quantity);

  return roundToNearestFiveCents(basePrice * discount);
}

/**
 * Calculate total price from sizes array [{ size, quantity }, ...]
 */
export function calculatePrice(sizes) {
  if (!sizes || !Array.isArray(sizes) || sizes.length === 0) return 0;
  let total = 0;
  sizes.forEach((item) => {
    if (!item.size || !item.quantity) return;
    const multiplier = SIZE_MULTIPLIERS[item.size] ?? 1;
    total += BASE_PRICE * multiplier * item.quantity;
  });
  return parseFloat(total.toFixed(2));
}
