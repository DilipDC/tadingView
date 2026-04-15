// ================= CHART UTILS =================

// 🎯 Generate realistic trend data
export function generateData(length = 60, base = 100) {
  const data = [base];

  let trend = Math.random() > 0.5 ? 1 : -1;

  for (let i = 1; i < length; i++) {

    // smooth trend shift
    if (Math.random() < 0.1) {
      trend *= -1;
    }

    const last = data[i - 1];

    const noise = (Math.random() - 0.5) * 2;
    const movement = trend * Math.random() * 2;

    const next = last + movement + noise;

    data.push(Math.max(1, next));
  }

  return data;
}


// ================= NORMALIZE =================

export function normalize(data, height) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return data.map(v =>
    height - ((v - min) / range) * height
  );
}


// ================= CANDLE GENERATION =================

export function toCandles(data) {
  return data.map(p => {

    const volatility = Math.random() * 4;

    const open = p;
    const close = p + (Math.random() - 0.5) * volatility;

    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;

    return {
      open,
      close,
      high,
      low
    };
  });
}


// ================= SMOOTH INTERPOLATION =================

export function smoothData(data, factor = 0.1) {
  const result = [...data];

  for (let i = 1; i < data.length; i++) {
    result[i] =
      result[i - 1] +
      (data[i] - result[i - 1]) * factor;
  }

  return result;
}


// ================= CLAMP =================

export function clampData(data, min = 1, max = 100000) {
  return data.map(v =>
    Math.max(min, Math.min(max, v))
  );
}