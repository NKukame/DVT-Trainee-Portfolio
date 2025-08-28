import { useState, useEffect } from "react";
import { Upload, Camera, Save, X } from "lucide-react";
import techStack from "./techstack.json";

function CareerFrom({ data, onChange }) {
  const [careerEntries, setCareerEntries] = useState(
    data.careerEntries || [{ role: "", company: "", duration: "" }],
  );
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
  const [projects, setProjects] = useState(data.projects || []);
  const [projectName, setProjectName] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [projectAuthor, setProjectAuthor] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDuties, setProjectDuties] = useState("");
  const [projectAchievements, setProjectAchievements] = useState("");
  const [projectDemoLink, setProjectDemoLink] = useState("");
  const [projectRepoLink, setProjectRepoLink] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [department, setDepartment] = useState(data.department || "");
  const departmentList = ["ENGINEERING", "DESIGN", "MARKETING", "SALES", "HR"];
  const [techStackGroups, setTechStackGroups] = useState({});

  useEffect(() => {
    const grouped = {};
    techStack.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item.name);
    });
    setTechStackGroups(grouped);
  }, []);

  // Function to handle changes in any input field
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEntries = [...careerEntries];
    updatedEntries[index][name] = value;
    setCareerEntries(updatedEntries);

    const filteredEntries = updatedEntries.filter(
      (entry) =>
        entry.role.trim() || entry.company.trim() || entry.duration.trim(),
    );

    onChange({
      ...data,
      careerEntries: filteredEntries,
      projects,
      department,
      // ...add other fields if needed
    });

    if (
      index === updatedEntries.length - 1 &&
      updatedEntries[index].role &&
      updatedEntries[index].company &&
      updatedEntries[index].duration
    ) {
      setCareerEntries([
        ...updatedEntries,
        { role: "", company: "", duration: "" },
      ]);
    }
  };

  // Function to handle removing a career entry
  const handleRemoveEntry = (index) => {
    if (careerEntries.length === 1 && index === 0) {
      setCareerEntries([{ role: "", company: "", duration: "" }]);
      return;
    }

    const updatedEntries = careerEntries.filter((_, i) => i !== index);
    const filteredEntries = updatedEntries.filter(
      (entry) =>
        entry.role.trim() || entry.company.trim() || entry.duration.trim(),
    );
    setCareerEntries(updatedEntries);

    onChange({
      ...data,
      careerEntries: filteredEntries,
      projects,
      department,
    });
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
        selectedTechnologies.filter((t) => t !== technology),
      );
    } else {
      setSelectedTechnologies([...selectedTechnologies, technology]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = () => {
    if (!projectName || !projectImage) return;
    let updatedProjects;
    const projectData = {
      name: projectName,
      author: projectAuthor,
      image: projectImage,
      description: projectDescription,
      duties: projectDuties,
      achievements: projectAchievements,
      demoLink: projectDemoLink,
      repoLink: projectRepoLink,
      industries: selectedIndustries,
      technologies: selectedTechnologies,
      date: new Date().toLocaleDateString(),
    };
    if (editIndex !== null) {
      updatedProjects = [...projects];
      updatedProjects[editIndex] = {
        ...updatedProjects[editIndex],
        ...projectData,
        date: updatedProjects[editIndex].date || projectData.date,
      };
    } else {
      updatedProjects = [...projects, projectData];
    }
    setProjects(updatedProjects);

    // Notify parent of the change
    onChange({
      ...data,
      careerEntries,
      projects: updatedProjects,
      department,
    });

    // Reset modal fields
    setShowModal(false);
    setProjectName("");
    setProjectImage(null);
    setProjectDescription("");
    setProjectDuties("");
    setProjectAchievements("");
    setProjectDemoLink("");
    setProjectRepoLink("");
    setSelectedIndustries([]);
    setSelectedTechnologies([]);
    setEditIndex(null);
  };

  const handleDeleteProject = () => {
    if (editIndex !== null) {
      const updatedProjects = projects.filter((_, i) => i !== editIndex);
      setProjects(updatedProjects);
      onChange({
        ...data,
        careerEntries,
        projects: updatedProjects,
        department,
      });
      setShowModal(false);
      setEditIndex(null);
      setProjectName("");
      setProjectImage(null);
      setProjectAuthor("");
      setProjectDescription("");
      setProjectDuties("");
      setProjectAchievements("");
      setProjectDemoLink("");
      setProjectRepoLink("");
      setSelectedIndustries([]);
      setSelectedTechnologies([]);
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

        <div className="form-group">
          <label htmlFor="department">
            Department<span className="required-asterisk">*</span>
          </label>
          <select
            id="department"
            name="department"
            className=" the-department"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              onChange({
                ...data,
                department: e.target.value,
                careerEntries,
                projects,
              });
            }}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departmentList.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="career-form-projects">
          <label htmlFor="career-chronology">Projects</label>

          <div className="career-form-projects-container">
            <div className="career-form-projects-entries-container">
              <div className="career-projects-upload">
                <Upload
                  size={50}
                  className="career-projects-upload-icon"
                  color="var(--navy-blue)"
                />
                <button onClick={() => setShowModal(true)}>
                  Upload Project
                </button>
              </div>
            </div>

            <div className="career-form-projects-entries-container">
              {projects.map((proj, idx) => (
                <div
                  className="career-uploaded-projects"
                  key={idx}
                  onClick={() => {
                    setEditIndex(idx);
                    setProjectName(proj.name);
                    setProjectImage(proj.image);
                    setProjectAuthor(proj.author || "");
                    setProjectDescription(proj.description || "");
                    setProjectDuties(proj.duties || "");
                    setProjectAchievements(proj.achievements || "");
                    setProjectDemoLink(proj.demoLink || "");
                    setProjectRepoLink(proj.repoLink || "");
                    setSelectedIndustries(proj.industries || []);
                    setSelectedTechnologies(proj.technologies || []);
                    setShowModal(true);
                  }}
                >
                  <div className="career-uploaded-project-thumbnail">
                    <img src={proj.image} alt={proj.name} />
                  </div>
                  <div className="career-uploaded-project-description">
                    <h3>{proj.name}</h3>
                    <label>Date Submitted: {proj.date}</label>
                  </div>
                </div>
              ))}
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
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
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
                  value={projectAuthor}
                  onChange={(e) => setProjectAuthor(e.target.value)}
                />
              </div>
            </div>

            <div className="career-project-image-upload">
              {projectImage ? (
                <>
                  <img
                    src={projectImage}
                    alt="Project Preview"
                    className="career-project-image-preview"
                  />
                  <button
                    className="remove-profile-pic-btn"
                    type="button"
                    onClick={() => setProjectImage(null)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <Camera
                    size={30}
                    className="career-projects-upload-icon"
                    color="var(--navy-blue)"
                  />
                  <input
                    type="file"
                    id="project-image"
                    name="project-image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </>
              )}
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
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
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
                      {Object.entries(techStackGroups).map(
                        ([category, techs]) => (
                          <div key={category} className="skills-category">
                            <p className="skills-category-title">{category}</p>
                            <div className="skills-labels-container">
                              {techs.map((technology, idx) => {
                                const isSelected =
                                  selectedTechnologies.includes(technology);
                                return (
                                  <span
                                    key={idx}
                                    className={`badge-default ${
                                      isSelected ? "badge-active" : ""
                                    }`}
                                    onClick={() =>
                                      handleTechnologyClick(technology)
                                    }
                                  >
                                    {technology}
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
                  value={projectDuties}
                  onChange={(e) => setProjectDuties(e.target.value)}
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
                  value={projectAchievements}
                  onChange={(e) => setProjectAchievements(e.target.value)}
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
                  value={projectDemoLink}
                  onChange={(e) => setProjectDemoLink(e.target.value)}
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
                  value={projectRepoLink}
                  onChange={(e) => setProjectRepoLink(e.target.value)}
                />
              </div>
            </div>

            <div
              className={`career-modal-button-section${
                editIndex === null ? " single" : ""
              }`}
            >
              {editIndex !== null && (
                <button
                  className="career-modal-close-button"
                  onClick={handleDeleteProject}
                  type="button"
                >
                  <X size={15} />
                  Delete
                </button>
              )}
              <button
                className="career-modal-submit-button"
                onClick={handleSaveProject}
                style={editIndex === null ? { flex: 1 } : {}}
                type="button"
              >
                <Save size={15} />
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
