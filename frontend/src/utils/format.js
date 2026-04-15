// Format price (₹ or $ style)
export function formatPrice(value) {
  if (value == null) return "0.00";
  return Number(value).toFixed(2);
}

// Short number (1K, 1M)
export function shortNumber(num) {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num;
}

// Format time
export function formatTime(ts) {
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString();
}