/**
 * Utility functions for Indian Rupee currency formatting and number representations
 */

export const fmt = (n) => {
  if (n === undefined || n === null || isNaN(n)) return '₹0.00';
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  if (n >= 1) return `₹${n.toFixed(2)}`;
  return `₹${n.toFixed(4)}`;
};

export const fmt2 = (n) => {
  if (n === undefined || n === null || isNaN(n)) return '0.00';
  if (n >= 100000) return `${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return n.toFixed(n < 10 ? 4 : 2);
};