export function normalizeData(data, height) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return data.map(v => height - ((v - min) / range) * height);
}

export function generateDummyCandles(data) {
  return data.map(p => {
    const variation = Math.random() * 5;

    return {
      open: p,
      close: p + (Math.random() - 0.5) * variation,
      high: p + variation,
      low: p - variation
    };
  });
}