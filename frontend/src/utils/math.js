// Percentage change
export function percentChange(oldVal, newVal) {
  if (!oldVal) return 0;
  return ((newVal - oldVal) / oldVal) * 100;
}

// Clamp value
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Random range
export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}