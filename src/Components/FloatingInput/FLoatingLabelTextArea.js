import React, { useState } from "react";
import "./FloatingLabelInput.css"; // same CSS file

const FloatingLabelTextarea = ({ label, value, onChange, rows = 3 }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="floating-input-container">
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        className="floating-input"
      ></textarea>
      <label
        className={`floating-label ${isFocused ? "active" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelTextarea;
