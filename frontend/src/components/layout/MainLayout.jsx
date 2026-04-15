import React from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import RightPanel from "./RightPanel";
import BottomPanel from "./BottomPanel";

export default function MainLayout({
  children,
  stocks,
  selectedStock,
  setSelectedStock
}) {
  return (
    <div className="main-layout">

      {/* LEFT SIDEBAR */}
      <Sidebar
        stocks={stocks}
        onSelect={setSelectedStock}
      />

      {/* CENTER AREA */}
      <div className="main-center">

        <Topbar stock={selectedStock} />

        <div className="chart-area">
          {children}
        </div>

        <BottomPanel />

      </div>

      {/* RIGHT PANEL */}
      <RightPanel stocks={stocks} />

    </div>
  );
}