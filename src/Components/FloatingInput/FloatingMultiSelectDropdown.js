import React, { useState, useRef, useEffect } from "react";
import "./FloatingLabelInput.css";

const FloatingMultiSelectDropdown = ({
  label,
  options = [],
  name,
  value = [],
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (value.length > 0) setIsFocused(true);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        if (value.length === 0) setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  // toggle selected items
  const toggleSelection = (selectedValue) => {
    let updatedValues;
    if (value.includes(selectedValue)) {
      updatedValues = value.filter((v) => v !== selectedValue);
    } else {
      updatedValues = [...value, selectedValue];
    }

    onChange({
      target: { name, value: updatedValues },
    });
  };

  const filteredOptions = options.filter((opt) => {
    const labelText = opt.label || opt.value || opt;
    return labelText.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="floating-dropdown-container" ref={containerRef}>
      <div
        className="dropdown-header"
        onClick={() => {
          setOpen(!open);
          setIsFocused(true);
        }}
      >
        <div className="selected-values">
          {value.length > 0
            ? value
                .map((val) => {
                  const found = options.find(
                    (opt) => (opt.value || opt) === val
                  );
                  return found?.label || val;
                })
                .join(", ")
            : ""}
        </div>

        <span className={`arrow ${open ? "open" : ""}`}>&#9662;</span>
      </div>

      <label className={`floating-label ${isFocused ? "active" : ""}`}>
        {label}
      </label>

      {open && (
        <div className="dropdown-menu">
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="options-list">
            {filteredOptions.length === 0 && (
              <div className="no-options">No results found</div>
            )}

            {filteredOptions.map((opt, idx) => {
              const actualValue = opt.value || opt;
              const actualLabel = opt.label || opt;

              return (
                <label key={idx} className="option-item">
                  <input
                    type="checkbox"
                    checked={value.includes(actualValue)}
                    onChange={() => toggleSelection(actualValue)}
                  />
                  <span>{actualLabel}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingMultiSelectDropdown;
