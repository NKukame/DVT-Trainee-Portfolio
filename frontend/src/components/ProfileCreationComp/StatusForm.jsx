import React, { useState } from "react";
import "./Form.css";

function StatusForm() {
  const [assigned, setAssigned] = useState("");

  const isInactive = assigned === "no";

  return (
    <div className="status-form-container">
      <form action="" className="status-form">
        <div className="form-group">
          <label htmlFor="status-label">
            Are You Currently Assigned To A Client
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="status"
            name="status"
            required
            value={assigned}
            onChange={(e) => setAssigned(e.target.value)}
          >
            <option value="" disabled>
              Select Your Status
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className={`form-group${isInactive ? " inactive" : ""}`}>
          <label htmlFor="client-label">
            Client
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            id="assigned-client"
            name="assigned-client"
            placeholder="Enter Client Name"
            required
            disabled={isInactive}
          />
        </div>

        <div className={`form-group${isInactive ? " inactive" : ""}`}>
          <label htmlFor="availability-label">
            Assessment Duration
            <span className="required-asterisk">*</span>
          </label>
          <div className="skills-dual-input">
            <input
              type="date"
              id="assessment-start"
              name="assessment-start"
              required
              disabled={isInactive}
            />
            <input
              type="date"
              id="assessment-end"
              name="assessment-end"
              required
              disabled={isInactive}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default StatusForm;