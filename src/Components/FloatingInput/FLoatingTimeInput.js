import React, { useState } from "react";
import "./FloatingLabelInput.css";

const FloatingTimeInput = ({ label, value, name, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="floating-input-container">
      <input
        type="time"
        value={value}
        name={name}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        className="floating-input date-input"
      />
      <label
        className={`floating-label ${isFocused || value ? "active" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingTimeInput;