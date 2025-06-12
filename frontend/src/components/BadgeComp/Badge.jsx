import React from "react";
import "./Badge.css";
import { X } from "lucide-react";

export function Badge({ children, onClose }) {
  return (
    <span className="badge-container">
      <span className="badge-label">{children}</span>
      {onClose && (
        <button
          type="button"
          className="badge-close"
          onClick={onClose}
          aria-label="Remove badge"
        >
          <X size="12px" strokeWidth={3} />
        </button>
      )}
    </span>
  );
}

