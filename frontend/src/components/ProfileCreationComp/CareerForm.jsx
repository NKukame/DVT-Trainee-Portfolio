import { useState } from "react";
import { Upload, Camera, Save, X } from "lucide-react";
import "./Form.css";

function CareerFrom() {
  const [careerEntries, setCareerEntries] = useState([
    { role: "", company: "", duration: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const industriesList = [
    "Finance",
    "Healthcare",
    "Education",
    "Technology",
    "Retail",
    "Manufacturing",
    "Government",
    "Telecommunications",
    "Energy",
    "Transportation",
    "Hospitality",
    "Real Estate",
    "Construction",
    "Entertainment",
    "Agriculture",
  ];
  const technologiesList = [
    "Figma",
    "Sketch",
    "Java",
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "Django",
    "Laravel",
    "PHP",
    "C++",
    "Ruby",
    "Go",
    "HTML",
    "CSS",
    "Vue",
    "Angular",
    "Svelte",
    "Bootstrap",
    "Tailwind CSS",
    "C",
    "Swift",
    "Kotlin",
    "Rust",
    "TypeScript",
    "NoSQL",
    "GraphQL",
    "Redis",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
  ];
  const [showIndustriesDropdown, setShowIndustriesDropdown] = useState(false);
  const [showTechnologiesDropdown, setShowTechnologiesDropdown] =
    useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

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

  const handleIndustryClick = (industry) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const handleTechnologyClick = (technology) => {
    if (selectedTechnologies.includes(technology)) {
      setSelectedTechnologies(
        selectedTechnologies.filter((t) => t !== technology)
      );
    } else {
      setSelectedTechnologies([...selectedTechnologies, technology]);
    }
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
              <button onClick={() => setShowModal(true)}>Upload Project</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="career-upload-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("career-upload-modal-overlay")) {
              setShowModal(false);
            }
          }}
        >
          <div className="career-upload-modal">
            <div className="career-project-top-section">
              <div className="form-group">
                <label htmlFor="project-name">
                  Project Name<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  id="project-name"
                  name="project-name"
                  placeholder="Enter project name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-name">
                  Author/s<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  id="author-name"
                  name="author-name"
                  placeholder="Enter Author Name"
                />
              </div>
            </div>

            <div className="career-project-image-upload">
              <Camera size={30} className="career-projects-upload-icon" />
              <input
                type="file"
                id="project-image"
                name="project-image"
                accept="image/*"
              />
            </div>

            <div className="career-project-description">
              <div className="form-group">
                <h3>
                  Project Description
                  <span className="required-asterisk">*</span>
                </h3>
                <textarea
                  id="project-description"
                  name="project-description"
                  placeholder="Enter Project Description"
                ></textarea>
              </div>
            </div>

            <div className="career-project-industries">
              <div className="form-group">
                <h3>
                  Industries<span className="required-asterisk">*</span>
                </h3>
                <div className="custom-dropdown-wrapper">
                  <div
                    className="custom-dropdown-toggle"
                    onClick={() =>
                      setShowIndustriesDropdown(!showIndustriesDropdown)
                    }
                  >
                    {selectedIndustries.length > 0
                      ? selectedIndustries.join(", ")
                      : "Select Industries"}
                  </div>
                  {showIndustriesDropdown && (
                    <div className="skills-dropdown">
                      <div className="skills-labels-container">
                        {industriesList.map((industry, idx) => {
                          const isSelected =
                            selectedIndustries.includes(industry);
                          return (
                            <span
                              key={idx}
                              className={`badge-default ${
                                isSelected ? "badge-active" : ""
                              }`}
                              onClick={() => handleIndustryClick(industry)}
                            >
                              {industry}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="career-project-technologies">
              <div className="form-group">
                <h3>
                  Technologies<span className="required-asterisk">*</span>
                </h3>
                <div className="custom-dropdown-wrapper">
                  <div
                    className="custom-dropdown-toggle"
                    onClick={() =>
                      setShowTechnologiesDropdown(!showTechnologiesDropdown)
                    }
                  >
                    {selectedTechnologies.length > 0
                      ? selectedTechnologies.join(", ")
                      : "Select Technologies"}
                  </div>
                  {showTechnologiesDropdown && (
                    <div className="skills-dropdown">
                      <div className="skills-labels-container">
                        {technologiesList.map((technology, idx) => {
                          const isSelected =
                            selectedTechnologies.includes(technology);
                          return (
                            <span
                              key={idx}
                              className={`badge-default ${
                                isSelected ? "badge-active" : ""
                              }`}
                              onClick={() => handleTechnologyClick(technology)}
                            >
                              {technology}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="career-project-duties">
              <div className="form-group">
                <h3>
                  Duties<span className="required-asterisk">*</span>
                </h3>
                <textarea
                  id="project-duties"
                  name="project-duties"
                  placeholder="Enter Project Duties"
                ></textarea>
              </div>
            </div>

            <div className="career-project-achievements">
              <div className="form-group">
                <h3>
                  Achievements<span className="required-asterisk">*</span>
                </h3>
                <textarea
                  id="project-achievements"
                  name="project-achievements"
                  placeholder="Enter Project Achievements"
                ></textarea>
              </div>
            </div>

            <div className="career-project-bottom-section">
              <div className="form-group">
                <label htmlFor="project-link">
                  Demo Link<span className="required-asterisk">*</span>
                </label>
                <input
                  type="url"
                  id="demo-link"
                  name="demo-link"
                  placeholder="Insert Link"
                />
              </div>
              <div className="form-group">
                <label htmlFor="github-link">
                  Repo Link<span className="required-asterisk">*</span>
                </label>
                <input
                  type="url"
                  id="repo-link"
                  name="repo-link"
                  placeholder="Insert Link"
                />
              </div>
            </div>

            <div className="career-modal-button-section">
              <button
                onClick={() => setShowModal(false)}
                className="career-modal-close-button"
              >
                <X size={15}/>
                Close
              </button>
              <button className="career-modal-submit-button">
                <Save size={15}/>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerFrom;
