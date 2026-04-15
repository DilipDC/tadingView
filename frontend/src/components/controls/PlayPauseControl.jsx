import React from "react";

export default function PlayPauseControl({ running, setRunning }) {
  return (
    <button
      className="control-btn"
      onClick={() => setRunning(!running)}
    >
      {running ? "⏸ Pause" : "▶ Play"}
    </button>
  );
}