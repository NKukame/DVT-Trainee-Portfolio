import { useState } from "react";
import "./Form.css";

function SkillsForm() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [showSoftSkillsDropdown, setShowSoftSkillsDropdown] = useState(false);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
  const techStackGroups = {
    Design: [
      "Figma",
      "Sketch",
      "Photoshop",
      "Illustrator",
      "Adobe XD",
      "Canva",
      "InVision",
      "CorelDRAW",
    ],
    "Front-end": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue",
      "Angular",
      "Svelte",
      "Bootstrap",
      "Tailwind CSS",
    ],
    "Back-end": [
      "Node.js",
      "Express",
      "Django",
      "Laravel",
      "PHP",
      "Java",
      "C++",
      "Python",
      "Ruby",
      "Go",
    ],
  };
  const softSkills = [
    "Communication",
    "Teamwork",
    "Problem-solving",
    "Adaptability",
    "Time Management",
    "Creativity",
    "Leadership",
    "Emotional Intelligence",
    "Critical Thinking",
    "Conflict Resolution",
    "Collaboration",
    "Decision Making",
    "Interpersonal Skills",
    "Negotiation",
    "Active Listening",
    "Attention to Detail",
    "Stress Management",
    "Positive Attitude",
    "Work Ethic",
    "Self-Motivation",
    "Flexibility",
    "Cultural Awareness",
  ];
  const [educationEntries, setEducationEntries] = useState([
    { qualification: "", institution: "" },
  ]);
  const [certificationEntries, setCertificationEntries] = useState([
    { certificate: "", institution: "" },
  ]);

  const handleBadgeClick = (label) => {
    if (selectedTechnologies.includes(label)) {
      setSelectedTechnologies(
        selectedTechnologies.filter((tech) => tech !== label)
      );
    } else {
      setSelectedTechnologies([...selectedTechnologies, label]);
    }
  };

  const handleRemoveTech = (tech) => {
    setSelectedTechnologies((prev) => prev.filter((t) => t !== tech));
  };

  const handleSoftSkillClick = (skill) => {
    if (selectedSoftSkills.includes(skill)) {
      setSelectedSoftSkills(selectedSoftSkills.filter((s) => s !== skill));
    } else {
      setSelectedSoftSkills([...selectedSoftSkills, skill]);
    }
  };

  const handleRemoveSoftSkill = (skill) => {
    setSelectedSoftSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...educationEntries];
    updated[index][name] = value;
    setEducationEntries(updated);

    // If last row is filled, add a new empty row
    if (
      index === educationEntries.length - 1 &&
      updated[index].qualification &&
      updated[index].institution
    ) {
      setEducationEntries([...updated, { qualification: "", institution: "" }]);
    }
  };

  const handleRemoveEducation = (index) => {
    if (educationEntries.length === 1) {
      setEducationEntries([{ qualification: "", institution: "" }]);
      return;
    }
    setEducationEntries(educationEntries.filter((_, i) => i !== index));
  };

  const handleCertificationChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...certificationEntries];
    updated[index][name] = value;
    setCertificationEntries(updated);

    // If last row is filled, add a new empty row
    if (
      index === certificationEntries.length - 1 &&
      updated[index].certificate &&
      updated[index].institution
    ) {
      setCertificationEntries([
        ...updated,
        { certificate: "", institution: "" },
      ]);
    }
  };

  const handleRemoveCertification = (index) => {
    if (certificationEntries.length === 1) {
      setCertificationEntries([{ certificate: "", institution: "" }]);
      return;
    }
    setCertificationEntries(certificationEntries.filter((_, i) => i !== index));
  };

  return (
    <div className="skills-container">
      <form action="" className="skills-form">
        <div className="left-form-group">
          <div className="form-group">
            <label htmlFor="skills">
              Education<span className="required-asterisk">*</span>
            </label>
            {educationEntries.map((entry, idx) => (
              <div className="skills-dual-input" key={idx}>
                <input
                  type="text"
                  id={`qualification-${idx}`}
                  name="qualification"
                  placeholder="Enter Your Qualification"
                  value={entry.qualification}
                  onChange={(e) => handleEducationChange(idx, e)}
                />
                <input
                  type="text"
                  id={`institution-${idx}`}
                  name="institution"
                  placeholder="Enter Your Institution"
                  value={entry.institution}
                  onChange={(e) => handleEducationChange(idx, e)}
                />
                {(educationEntries.length > 1 ||
                  entry.qualification ||
                  entry.institution) && (
                  <button
                    type="button"
                    className="remove-tech-button"
                    onClick={() => handleRemoveEducation(idx)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="technology-stack">
              Technology Stack<span className="required-asterisk">*</span>
            </label>

            <div className="custom-dropdown-wrapper">
              <div
                className="custom-dropdown-toggle"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Select Technologies
              </div>

              {showDropdown && (
                <div className="skills-dropdown">
                  {Object.entries(techStackGroups).map(([category, labels]) => (
                    <div key={category} className="skills-category">
                      <p className="skills-category-title">{category}</p>
                      <div className="skills-labels-container">
                        {labels.map((label, index) => {
                          const isSelected =
                            selectedTechnologies.includes(label);
                          return (
                            <span
                              key={index}
                              className={`badge-default ${
                                isSelected ? "badge-active" : ""
                              }`}
                              onClick={() => handleBadgeClick(label)}
                            >
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="tech-stack-form-group">
            <h3>Detailed Tech Stack</h3>
            {selectedTechnologies.map((tech, index) => (
              <div key={index} className="chosen-tech-stack">
                <label htmlFor={`tech-${index}`}>{tech}</label>
                <select name={`experience-${tech}`} id={`tech-${index}`}>
                  <option value="#">Years</option>
                  <option value="0-1">0-1 Years</option>
                  <option value="1-2">1-2 Years</option>
                  <option value="3-4">3-4 Years</option>
                  <option value="4-5">4-5 Years</option>
                  <option value="5+">5+ Years</option>
                </select>
                <button
                  type="button"
                  className="remove-tech-button"
                  onClick={() => handleRemoveTech(tech)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="right-form-group">
          <div className="form-group">
            <label htmlFor="skills">Future Certification</label>
            {certificationEntries.map((entry, idx) => (
              <div className="skills-dual-input" key={idx}>
                <input
                  type="text"
                  id={`certificate-${idx}`}
                  name="certificate"
                  placeholder="Enter Your Certificate"
                  value={entry.certificate}
                  onChange={(e) => handleCertificationChange(idx, e)}
                />
                <input
                  type="text"
                  id={`certificate-institution-${idx}`}
                  name="institution"
                  placeholder="Enter Your Institution"
                  value={entry.institution}
                  onChange={(e) => handleCertificationChange(idx, e)}
                />
                {(certificationEntries.length > 1 ||
                  entry.certificate ||
                  entry.institution) && (
                  <button
                    type="button"
                    className="remove-tech-button"
                    onClick={() => handleRemoveCertification(idx)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="soft-skills">Soft Skills</label>

            <div className="custom-dropdown-wrapper">
              <div
                className="custom-dropdown-toggle"
                onClick={() =>
                  setShowSoftSkillsDropdown(!showSoftSkillsDropdown)
                }
              >
                Select Soft Skills
              </div>

              {showSoftSkillsDropdown && (
                <div className="skills-dropdown">
                  <div className="skills-labels-container">
                    {softSkills.map((skill, index) => {
                      const isSelected = selectedSoftSkills.includes(skill);
                      return (
                        <span
                          key={index}
                          className={`badge-default ${
                            isSelected ? "badge-active" : ""
                          }`}
                          onClick={() => handleSoftSkillClick(skill)}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="tech-stack-form-group">
            <h3>Selected Soft Skills</h3>
            {selectedSoftSkills.length > 0 && (
              <>
                {selectedSoftSkills.map((skill, index) => (
                  <div key={index} className="chosen-tech-stack">
                    <label>{skill}</label>
                    <button
                      type="button"
                      className="remove-tech-button"
                      onClick={() => handleRemoveSoftSkill(skill)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SkillsForm;
