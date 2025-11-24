import React, { useState } from "react";
import "./FloatingLabelInput.css"; // import the CSS

const FloatingLabelInput = ({ label, type = "text", value, onChange,name }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="floating-input-container">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        className="floating-input"
      />
      <label
        className={`floating-label ${isFocused ? "active" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
