import React from "react";
import "./Form.css";

function StatusForm({ data, onChange }) {
  const assigned = data.status || "";
  const isInactive = assigned === "no";

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="status-form-container">
      <form className="status-form">
        <div className="form-group">
          <label htmlFor="status">
            Are You Currently Assigned To A Client
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="status"
            name="status"
            required
            value={data.status || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Your Status
            </option>
            <option value="Available">Yes</option>
            <option value="Unavailable">No</option>
          </select>
        </div>

        <div className={`form-group${isInactive ? " inactive" : ""}`}>
          <label htmlFor="assigned-client">
            Client
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            id="assigned-client"
            name="assignedClient"
            placeholder="Enter Client Name"
            value={data.assignedClient || ""}
            onChange={handleChange}
            required
            disabled={isInactive}
          />
        </div>

        <div className={`form-group${isInactive ? " inactive" : ""}`}>
          <label htmlFor="assessment-start">
            Assessment Duration
            <span className="required-asterisk">*</span>
          </label>
          <div className="skills-dual-input">
            <div className="form-group">
              <label htmlFor="assessment-start">Start Date<span className="required-asterisk">*</span></label>
              <input
                type="date"
                id="assessment-start"
                name="assessmentStart"
                value={data.assessmentStart || ""}
                onChange={handleChange}
                required
                disabled={isInactive}
                max={today}
                style={{font: "inherit"}}
              />
            </div>
            <div className="form-group">
              <label htmlFor="assessment-end">End Date<span className="required-asterisk">*</span></label>
              <input
                type="date"
                id="assessment-end"
                name="assessmentEnd"
                value={data.assessmentEnd || ""}
                onChange={handleChange}
                required
                disabled={isInactive}
                min={data.assessmentStart || today}
                style={{font: "inherit"}}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StatusForm;
