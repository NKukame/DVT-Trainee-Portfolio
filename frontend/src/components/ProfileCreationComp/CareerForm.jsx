import { useState } from "react";
import { Upload } from "lucide-react";
import "./Form.css";

function CareerFrom() {
  const [careerEntries, setCareerEntries] = useState([
    { role: "", company: "", duration: "" },
  ]);

  // Function to handle changes in any input field
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEntries = [...careerEntries];
    updatedEntries[index][name] = value;
    setCareerEntries(updatedEntries);

    if (index === careerEntries.length - 1) {
      const lastEntry = updatedEntries[index];
      if (lastEntry.role && lastEntry.company && lastEntry.duration) {
        setCareerEntries([
          ...updatedEntries,
          { role: "", company: "", duration: "" },
        ]);
      }
    }
  };

  // Function to handle removing a career entry
  const handleRemoveEntry = (index) => {
    if (careerEntries.length === 1 && index === 0) {
      setCareerEntries([{ role: "", company: "", duration: "" }]);
      return;
    }

    const updatedEntries = careerEntries.filter((_, i) => i !== index);
    setCareerEntries(updatedEntries);
  };

  return (
    <div className="career-form">
      <div className="career-form-container">
        <div className="form-group">
          <label htmlFor="career-chronology">
            Career Chronology<span className="required-asterisk">*</span>
          </label>

          {careerEntries.map((entry, index) => (
            <div key={index} className="skills-dual-input career-entry-row">
              <input
                type="text"
                id={`role-${index}`} // Unique ID for each input
                name="role"
                required
                placeholder="Role"
                value={entry.role}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                id={`company-${index}`} // Unique ID for each input
                name="company"
                required
                placeholder="Company Name"
                value={entry.company}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                id={`duration-${index}`} // Unique ID for each input
                name="duration"
                required
                placeholder="Duration (e.g., 2020 - 2021)"
                value={entry.duration}
                onChange={(e) => handleChange(index, e)}
              />

              {(careerEntries.length > 1 ||
                (careerEntries.length === 1 &&
                  (entry.role || entry.company || entry.duration))) && (
                <button
                  type="button"
                  className="remove-entry-button"
                  onClick={() => handleRemoveEntry(index)}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="career-form-projects">
          <label htmlFor="career-chronology">Projects</label>

          <div className="career-form-projects-entries-container">

            <div className="career-projects-upload">
                <Upload size={50} className="career-projects-upload-icon" />
                <button>Upload Project</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default CareerFrom;
