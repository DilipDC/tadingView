// Normalize data for chart
export function normalize(data, height) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return data.map(v => height - ((v - min) / range) * height);
}

// Generate dummy chart data
export function generateData(length = 50) {
  let data = [100];

  for (let i = 1; i < length; i++) {
    const change = (Math.random() - 0.5) * 10;
    data.push(data[i - 1] + change);
  }

  return data;
}

// Convert to candles
export function toCandles(data) {
  return data.map(p => ({
    open: p,
    close: p + (Math.random() - 0.5) * 5,
    high: p + Math.random() * 5,
    low: p - Math.random() * 5
  }));
}