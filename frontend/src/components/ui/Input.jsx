import React from "react";

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text"
}) {
  return (
    <input
      className="ui-input"
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}