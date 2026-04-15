import React from "react";
import StockCard from "./StockCard";

export default function StockList({
  stocks,
  selected,
  setSelected
}) {
  return (
    <div className="stock-list">

      {stocks.map(stock => (
        <StockCard
          key={stock.id}
          stock={stock}
          onClick={setSelected}
          active={selected?.id === stock.id}
        />
      ))}

    </div>
  );
}