import React, { useState, useEffect } from "react";
import "./FloatingLabelInput.css";

const FloatingMultiSelectInput = ({
  label,
  options = [],
  name,
  value = [],
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value.length > 0) setIsFocused(true);
  }, [value]);

  const handleChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    onChange({ target: { name, value: selected } });
  };

  return (
    <div className="floating-input-container">
      <select
        multiple
        className="floating-input multi-select"
        value={value}
        name={name}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value.length > 0)}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>

      <label
        className={`floating-label ${isFocused || value.length > 0 ? "active" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingMultiSelectInput;
