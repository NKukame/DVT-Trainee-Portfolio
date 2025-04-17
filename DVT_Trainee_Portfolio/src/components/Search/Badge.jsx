// Badge.js
import { Cross, X } from "lucide-react";
import React from "react";

export function Badge({ children, onClose }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: "500",
        color: "#fff",
        border: "1px solid #D0D5DD",
        borderRadius: "0.375rem",
        gap: "3px",
        lineHeight: "0",
        paddingBlock: "2px",
        paddingLeft: "9px",
        paddingRight: "4px",
        // lineHeight: "1",
      }}
    >
        <span style={{
            marginBlock:"10px",
            display: "inline-block",
            color: "#344054"
        }}>
            {children}
        </span>
      {onClose && (
        <div
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#98A2B3",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex"
          }}
          aria-label="Remove badge"
        >
            <X size={"12px"} strokeWidth={3}/>
        </div>
      )}
    </span>
  );
}
