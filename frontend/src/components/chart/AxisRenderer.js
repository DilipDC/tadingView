export function drawAxis(ctx, width, height) {
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;

  // Horizontal grid
  for (let i = 0; i < 5; i++) {
    const y = (height / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Vertical grid
  for (let i = 0; i < 5; i++) {
    const x = (width / 5) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
}