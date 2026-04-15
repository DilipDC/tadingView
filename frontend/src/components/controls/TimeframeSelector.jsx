import React from "react";

const timeframes = ["1m", "2m", "5m", "15m"];

export default function TimeframeSelector({ value, onChange }) {
  return (
    <div className="control-group">
      <label>Time</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {timeframes.map(tf => (
          <option key={tf} value={tf}>{tf}</option>
        ))}
      </select>
    </div>
  );
}