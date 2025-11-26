import React, { useState } from "react";
import "./FloatingLabelInput.css";

const FloatingSelectInput = ({
  label,
  options = [],
  name,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="floating-input-container">
      <select
        className="floating-input"
        value={value}
        name={name}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
      >
        <option value="" disabled hidden></option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>

      <label className={`floating-label ${isFocused || value ? "active" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default FloatingSelectInput;
