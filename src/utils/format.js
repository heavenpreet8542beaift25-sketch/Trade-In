// Formats a number as an Indian-Rupee-style compact string, e.g. ₹5.84L, ₹1.2Cr.
export function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  if (n >= 1) return `₹${n.toFixed(2)}`;
  return `₹${n.toFixed(4)}`;
}

// Same scale as formatINR but without the currency symbol (used for hero stat ticks).
export function formatCompact(n) {
  if (n >= 100000) return `${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return n.toFixed(n < 10 ? 4 : 2);
}
