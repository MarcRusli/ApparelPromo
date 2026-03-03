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
