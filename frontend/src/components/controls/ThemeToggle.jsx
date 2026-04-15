import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="control-btn"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "🌙 Dark" : "☀ Light"}
    </button>
  );
}