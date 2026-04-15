import React from "react";
import { getStockImage } from "./StockImage";

export default function StockCard({ stock, onClick, active }) {
  return (
    <div
      className={`stock-card ${active ? "active" : ""}`}
      onClick={() => onClick(stock)}
    >
      <img src={getStockImage(stock.name)} alt="" width="30" />

      <div className="stock-info">
        <h4>{stock.name}</h4>
        <span>{stock.price.toFixed(2)}</span>
      </div>
    </div>
  );
}