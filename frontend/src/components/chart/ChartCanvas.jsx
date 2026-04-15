import React, { useRef, useEffect } from "react";
import { drawLine } from "./LineRenderer";
import { drawAxis } from "./AxisRenderer";

function ChartCanvas({ data = [] }) {

  const canvasRef = useRef(null);

  // ================= DRAW FUNCTION =================

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // set real canvas size
    canvas.width = width;
    canvas.height = height;

    // clear
    ctx.clearRect(0, 0, width, height);

    if (!data || data.length === 0) return;

    // draw grid + chart
    drawAxis(ctx, width, height);
    drawLine(ctx, data, width, height);
  };

  // ================= EFFECT =================

  useEffect(() => {
    drawChart();

    // redraw on resize
    window.addEventListener("resize", drawChart);

    return () => {
      window.removeEventListener("resize", drawChart);
    };
  }, [data]);

  // ================= RENDER =================

  return (
    <canvas
      ref={canvasRef}
      className="chart-canvas"
      style={{
        width: "100%",
        height: "100%",
        background: "#0b0f1a",
        borderRadius: "10px"
      }}
    />
  );
}

// 🔥 PERFORMANCE BOOST
export default React.memo(ChartCanvas);