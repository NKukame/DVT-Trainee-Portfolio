import React, { useState, useRef, useEffect } from "react";
import "./Combo.css";
import { Check, ChevronDown } from "@untitled-ui/icons-react";


export function Combobox({
  options = [],
  value = [],
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className = "",
  style = {},
  popoverClassName = "",
  popoverStyle = {},
  renderOption,
  multiple = true,
  handleFilterClick
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const popoverRef = useRef(null);
  
  // Calculate filtered options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (multiple) {
      // For multiple selection
      if (value.includes(optionValue)) {
        // Remove if already selected
        onChange(value.filter(v => v !== optionValue));
        handleFilterClick(optionValue.toLowerCase(), placeholder)
      } else {
        // Add to selection
        onChange([...value, optionValue]);
        handleFilterClick(optionValue.toLowerCase(), placeholder)
      }
    } else {
      // For single selection
      onChange(optionValue === value[0] ? [] : [optionValue]);
      setOpen(false);
    }
  };

  return (
    <div ref={popoverRef} className={`popoverContainer ${className}`} style={style}>
      <button
        className="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        role="combobox"
        type="button"
      >
        <span className="placeholder">{placeholder}</span>
        <ChevronDown width={"16px"} />
      </button>

      {open && (
        <div
          className={`popoverContent ${popoverClassName}`}
          style={popoverStyle}
        >
          <div className="commandContainer">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="commandInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />

            <div className="commandList">
              {filteredOptions.length === 0 ? (
                <div className="commandEmpty">No options found.</div>
              ) : (
                <div className="commandGroup">
                  {filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`commandItem ${
                        value.includes(option.value) ? "commandItemSelected" : ""
                      }`}
                      onClick={() => handleSelect(option.value)}
                    >
                      {renderOption ? renderOption(option) : option.label}
                      {value.includes(option.value) && <Check width={"16px"} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
