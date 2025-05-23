import React, { useState, useRef, useEffect } from "react";
import "./Combo.css";

const CheckIcon = ({ visible }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ opacity: visible ? 1 : 0, marginLeft: "auto" }}
  >
    <path
      d="M13.5 4.5L6 12L2.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ opacity: 0.5 }}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Combobox({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className = "",
  style = {},
  popoverClassName = "",
  popoverStyle = {},
  renderOption, // optional custom render function
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options

  return (
    <div ref={popoverRef} className={`popoverContainer ${className}`} style={style}>
      <button
        className="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        role="combobox"
        type="button"
      >
        <span>
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
        </span>
        <ChevronIcon />
      </button>

      {open && (
        <div className={`popoverContent ${popoverClassName}`} style={popoverStyle}>
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
                  {filteredOptions.map((option) =>
                    renderOption ? (
                      renderOption({
                        option,
                        selected: value === option.value,
                        onClick: () => {
                          onChange(option.value === value ? "" : option.value);
                          setOpen(false);
                        },
                      })
                    ) : (
                      <div
                        key={option.value}
                        className={`commandItem ${
                          value === option.value ? "commandItemSelected" : ""
                        }`}
                        onClick={() => {
                          onChange(option.value === value ? "" : option.value);
                          setOpen(false);
                        }}
                      >
                        {option}
                        <CheckIcon visible={value === option.value} />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
