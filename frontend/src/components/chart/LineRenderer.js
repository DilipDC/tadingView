export function drawLine(ctx, data, width, height) {
  const max = Math.max(...data);
  const min = Math.min(...data);

  const range = max - min || 1;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#00ff99";

  data.forEach((price, index) => {
    const x = (index / data.length) * width;
    const y = height - ((price - min) / range) * height;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}