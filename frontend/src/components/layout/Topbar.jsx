import React from "react";

export default function Topbar({ stock }) {
  return (
    <div className="topbar">

      <div className="top-left">
        <h3>{stock ? stock.name : "Select Stock"}</h3>
      </div>

      <div className="top-right">
        <button>Indicators</button>
        <button>Tools</button>
      </div>

    </div>
  );
}