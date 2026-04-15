import React from "react";

export default function RightPanel({ stocks }) {
  return (
    <div className="right-panel">

      <h3>📈 Watchlist</h3>

      {stocks.map(stock => (
        <div key={stock.id} className="watch-item">
          <span>{stock.name}</span>
          <span>{stock.price.toFixed(2)}</span>
        </div>
      ))}

    </div>
  );
}