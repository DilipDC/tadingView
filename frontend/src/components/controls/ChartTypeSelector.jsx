import React from "react";

export default function ChartTypeSelector({ type, setType }) {
  return (
    <div className="control-group">
      <label>Chart</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="line">Line</option>
        <option value="candle">Candle</option>
        <option value="area">Area</option>
      </select>
    </div>
  );
}