import React from "react";
import { getStockImage } from "./StockImage";

export default function StockDetails({ stock }) {
  if (!stock) return <div>Select a stock</div>;

  return (
    <div className="stock-details">

      <img src={getStockImage(stock.name)} width="50" />

      <h2>{stock.name}</h2>
      <h3>{stock.price.toFixed(2)}</h3>

      <div className="stock-stats">
        <p>Mode: {stock.mode}</p>
        <p>Users Up: {stock.users_up}</p>
        <p>Users Down: {stock.users_down}</p>
      </div>

    </div>
  );
}