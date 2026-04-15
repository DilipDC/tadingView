import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🎨 GLOBAL STYLES
import "./styles/global.css";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/animations.css";

// ================= ROOT INIT =================

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// ================= RENDER =================

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);