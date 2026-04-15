import React from "react";

export default function Sidebar({ stocks = [], onSelect }) {

  // fallback image handler
  function handleImageError(e) {
    e.target.src = "/icons/default.png";
  }

  return (
    <div className="sidebar">

      <h2>📊 Stocks</h2>

      {stocks.length === 0 && (
        <p style={{ opacity: 0.6 }}>No stocks available</p>
      )}

      {stocks.map(stock => (
        <div
          key={stock.id}
          className="sidebar-item"
          onClick={() => onSelect && onSelect(stock)}
        >
          <img
            src={`/icons/${stock.name}.png`}
            alt={stock.name}
            width="20"
            height="20"
            onError={handleImageError}
            style={{ borderRadius: "50%" }}
          />

          <span>{stock.name}</span>
        </div>
      ))}

    </div>
  );
}