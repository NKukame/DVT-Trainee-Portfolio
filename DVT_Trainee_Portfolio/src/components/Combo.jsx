import React, { useState, useRef, useEffect } from "react";
import "./Combo.css";

const ComboboxDemo = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const popoverRef = useRef(null);

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  // Handle clicks outside to close popover
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

  // Filter frameworks based on search query
  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simple check icon component
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

  // Simple chevron icon component
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

  return (
    <div ref={popoverRef} className="popoverContainer">
      <button
        className="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        role="combobox"
      >
        <span>
          {value
            ? frameworks.find(
                (framework) => framework.value === value
              )?.label
            : "Select framework..."}
        </span>
        <ChevronIcon />
      </button>

      {open && (
        <div className="popoverContent">
          <div className="commandContainer">
            <input
              type="text"
              placeholder="Search framework..."
              className="commandInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="commandList">
              {filteredFrameworks.length === 0 ? (
                <div className="commandEmpty">No framework found.</div>
              ) : (
                <div className="commandGroup">
                  {filteredFrameworks.map((framework) => (
                    <div
                      key={framework.value}
                      className={`commandItem ${
                        value === framework.value
                          ? "commandItemSelected"
                          : ""
                      }`}
                      onClick={() => {
                        setValue(
                          framework.value === value ? "" : framework.value
                        );
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      <CheckIcon visible={value === framework.value} />
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
};

export default ComboboxDemo;
