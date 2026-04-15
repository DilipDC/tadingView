import React, { useState } from "react";

export default function StockSearch({ stocks, setFiltered }) {
  const [query, setQuery] = useState("");

  function handleSearch(value) {
    setQuery(value);

    const filtered = stocks.filter(s =>
      s.name.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(filtered);
  }

  return (
    <input
      className="stock-search"
      placeholder="Search stock..."
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}