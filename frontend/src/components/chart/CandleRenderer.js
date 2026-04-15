export function drawCandles(ctx, candles, width, height) {
  if (!candles || candles.length === 0) return;

  const max = Math.max(...candles.map(c => c.high));
  const min = Math.min(...candles.map(c => c.low));
  const range = max - min || 1;

  const candleWidth = width / candles.length * 0.6;

  candles.forEach((candle, i) => {
    const x = (i / candles.length) * width;

    const openY = height - ((candle.open - min) / range) * height;
    const closeY = height - ((candle.close - min) / range) * height;
    const highY = height - ((candle.high - min) / range) * height;
    const lowY = height - ((candle.low - min) / range) * height;

    // wick
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.strokeStyle = "#aaa";
    ctx.stroke();

    // body
    ctx.fillStyle = candle.close > candle.open ? "#00ff99" : "#ff4444";

    ctx.fillRect(
      x - candleWidth / 2,
      Math.min(openY, closeY),
      candleWidth,
      Math.abs(openY - closeY)
    );
  });
}