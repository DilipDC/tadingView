import React from "react";

export default function LayoutContainer({ children }) {
  return (
    <div className="layout-root">
      {children}
    </div>
  );
}