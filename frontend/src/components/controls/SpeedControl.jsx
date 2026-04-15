import React from "react";

export default function SpeedControl({ speed, setSpeed }) {
  return (
    <div className="control-group">
      <label>Speed</label>
      <input
        type="range"
        min="1"
        max="5"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
      <span>{speed}x</span>
    </div>
  );
}