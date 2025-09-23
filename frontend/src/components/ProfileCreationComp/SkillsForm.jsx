import { useState, useEffect } from "react";
import techStack from "./techstack.json";
import softSkillsData from "./SoftSkills.json";

function SkillsForm({ data, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [showSoftSkillsDropdown, setShowSoftSkillsDropdown] = useState(false);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
  const [softSkillRatings, setSoftSkillRatings] = useState({});
  const [techExperience, setTechExperience] = useState({});
  const [techStackGroups, setTechStackGroups] = useState({});
  const [softSkillsGroups, setSoftSkillsGroups] = useState({});
  const [educationEntries, setEducationEntries] = useState([
    { qualification: "", institution: "" },
  ]);
  const [certificationEntries, setCertificationEntries] = useState([
    { certificate: "", certificatesInstitution: "" },
  ]);

  useEffect(() => {
    setSelectedTechnologies(data.selectedTechnologies || []);
    setSelectedSoftSkills(data.selectedSoftSkills || []);
    setSoftSkillRatings(data.softSkillRatings || {});
    setEducationEntries(
      data.educationEntries || [{ qualification: "", institution: "" }],
    );
    setCertificationEntries(
      data.certificationEntries || [
        { certificate: "", certificatesInstitution: "" },
      ],
    );
    setTechExperience(data.techExperience || {});
  }, [data]);

  useEffect(() => {
    // Group techStack by category
    const grouped = {};
    techStack.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item.name);
    });
    setTechStackGroups(grouped);
  }, []);

  useEffect(() => {
    // Group soft skills by category
    const grouped = {};
    softSkillsData.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      item.skills.forEach((skill) => {
        grouped[item.category].push(skill.name);
      });
    });
    setSoftSkillsGroups(grouped);
  }, []);

  const handleBadgeClick = (label) => {
    let updated;
    if (selectedTechnologies.includes(label)) {
      updated = selectedTechnologies.filter((tech) => tech !== label);
    } else {
      updated = [...selectedTechnologies, label];
    }
    setSelectedTechnologies(updated);
    onChange({
      ...data,
      selectedTechnologies: updated,
      selectedSoftSkills,
      softSkillRatings,
      educationEntries,
      certificationEntries,
      techExperience,
    });
  };

  const handleRemoveTech = (tech) => {
    const updated = selectedTechnologies.filter((t) => t !== tech);
    setSelectedTechnologies(updated);
    onChange({
      ...data,
      selectedTechnologies: updated,
      selectedSoftSkills,
      softSkillRatings,
      educationEntries,
      certificationEntries,
      techExperience,
    });
  };

  const handleSoftSkillClick = (skill) => {
    let updated;
    if (selectedSoftSkills.includes(skill)) {
      updated = selectedSoftSkills.filter((s) => s !== skill);
    } else {
      if (selectedSoftSkills.length >= 6) return;
      updated = [...selectedSoftSkills, skill];
    }
    setSelectedSoftSkills(updated);
    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills: updated,
      softSkillRatings,
      educationEntries,
      certificationEntries,
      techExperience,
    });
  };

  const handleSoftSkillRatingChange = (skill, value) => {
    const updated = {
      ...softSkillRatings,
      [skill]: value,
    };
    setSoftSkillRatings(updated);
    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills,
      softSkillRatings: updated,
      educationEntries,
      certificationEntries,
      techExperience,
    });
  };

  const handleRemoveSoftSkill = (skill) => {
    const updated = selectedSoftSkills.filter((s) => s !== skill);
    setSelectedSoftSkills(updated);
    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills: updated,
      softSkillRatings,
      educationEntries,
      certificationEntries,
      techExperience,
    });
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...educationEntries];
    updated[index][name] = value;
    let newEntries = updated;
    // If last row is filled, add a new empty row
    if (
      index === educationEntries.length - 1 &&
      updated[index].qualification &&
      updated[index].institution
    ) {
      newEntries = [...updated, { qualification: "", institution: "" }];
      setEducationEntries(newEntries);
    } else {
      setEducationEntries(updated);
    }

    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills,
      softSkillRatings,
      educationEntries: newEntries,
      certificationEntries,
      techExperience,
    });
  };

  const handleRemoveEducation = (index) => {
    let newEntries;
    if (educationEntries.length === 1) {
      newEntries = [{ qualification: "", institution: "" }];
    } else {
      newEntries = educationEntries.filter((_, i) => i !== index);
    }
    setEducationEntries(newEntries);
    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills,
      softSkillRatings,
      educationEntries: newEntries,
      certificationEntries,
      techExperience,
    });
  };

  const handleCertificationChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...certificationEntries];
    updated[index][name] = value;
    let newEntries = updated;
    // If last row is filled, add a new empty row
    if (
      index === certificationEntries.length - 1 &&
      updated[index].certificate &&
      updated[index].certificatesInstitution
    ) {
      newEntries = [
        ...updated,
        { certificate: "", certificatesInstitution: "" },
      ];
      setCertificationEntries(newEntries);
    } else {
      setCertificationEntries(updated);
    }
    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills,
      softSkillRatings,
      educationEntries,
      certificationEntries: newEntries,
      techExperience,
    });
  };

  const handleRemoveCertification = (index) => {
    let newEntries;
    if (certificationEntries.length === 1) {
      newEntries = [{ certificate: "", certificatesInstitution: "" }];
    } else {
      newEntries = certificationEntries.filter((_, i) => i !== index);
    }
    setCertificationEntries(newEntries);
    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills,
      softSkillRatings,
      educationEntries,
      certificationEntries: newEntries,
      techExperience,
    });
  };

  const handleTechExperienceChange = (tech, value) => {
    const updated = {
      ...techExperience,
      [tech]: value,
    };
    setTechExperience(updated);
    onChange({
      ...data,
      selectedTechnologies,
      selectedSoftSkills,
      softSkillRatings,
      educationEntries,
      certificationEntries,
      techExperience: updated,
    });
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
                <select
                  name={`experience-${tech}`}
                  id={`tech-${index}`}
                  value={techExperience[tech] || ""}
                  onChange={(e) =>
                    handleTechExperienceChange(tech, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Rating
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
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
                  name="certificatesInstitution"
                  placeholder="Enter Your Institution"
                  value={entry.certificatesInstitution}
                  onChange={(e) => handleCertificationChange(idx, e)}
                />
                {(certificationEntries.length > 1 ||
                  entry.certificate ||
                  entry.certificatesInstitution) && (
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

              {selectedSoftSkills.length >= 6 && (
                <div className="soft-skill-limit-msg">
                  You can select up to 6 soft skills only.
                </div>
              )}

              {showSoftSkillsDropdown && (
                <div className="skills-dropdown">
                  {Object.entries(softSkillsGroups).map(
                    ([category, skills]) => (
                      <div key={category} className="skills-category">
                        <p className="skills-category-title">{category}</p>
                        <div className="skills-labels-container">
                          {skills.map((skill, index) => {
                            const isSelected =
                              selectedSoftSkills.includes(skill);
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
                    ),
                  )}
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
                    <select
                      value={softSkillRatings[skill] || ""}
                      onChange={(e) =>
                        handleSoftSkillRatingChange(skill, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Rating (Out of 5)
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
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
