import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "../../components/SidebarComp/SideBar";
import { SquarePen } from "lucide-react";
import "./EditProfile.css";
import axios from "axios";

/**
 * EditProfile is a React component that renders a form for editing user profile information.
 *
 * @param {Object} prop - The props object containing location state data.
 * @return {JSX.Element} The rendered EditProfile component.
 */
function EditProfile(prop) {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    id: location.state.id || location.state.employee_id,
    employee_id: location.state.id || location.state.employee_id,
    department: location.state.department || "",
    title: location.state.title || "",
    name: location.state.name?.split(" ")[0] || "",
    photoUrl: location.state.avatar || "",
    surname: location.state.surname || "",
    email: location.state.email || "",
    phone: location.state.phone || "",
    role: location.state.role || "",
    company: location.state.company || "",
    bio: location.state.bio || "",
    location: location.state.location || "",
    experience: location.state.experienced || "",
    github: location.state.github || "",
    linkedIn: location.state.linkedIn || "",
    portfolio: location.state.portfolio || "",
    availability: Array.isArray(location.state.availability)
      ? location.state.availability
      : [location.state.availability],
    education: Array.isArray(location.state.education || location.state.emp_education)
      ? (location.state.education || location.state.emp_education)
      : (location.state.education || location.state.emp_education)
      ? [location.state.education || location.state.emp_education]
      : [{ qualification: '', institution: '' }],
    certificates: Array.isArray(location.state.certificates)
      ? location.state.certificates
      : location.state.certificates
      ? [location.state.certificates]
      : [{ name: '', institution: '' }],
    softSkills: Array.isArray(location.state.softSkills)
      ? location.state.softSkills
      : location.state.softSkills
      ? [location.state.softSkills]
      : [{ skillsRating: '', softSkill: { name: '' } }],
    techStack: Array.isArray(location.state.techStack)
      ? location.state.techStack
      : location.state.techStack
      ? [location.state.techStack]
      : [{ Techrating: '', techStack: { name: '' } }],
    testimonials: Array.isArray(location.state.testimonials)
      ? location.state.testimonials
      : location.state.testimonials
      ? [location.state.testimonials]
      : [{ company: '', quote: '', reference: '' }],
    career: Array.isArray(location.state.career)
      ? location.state.career
      : location.state.career
      ? [location.state.career]
      : [{ role: '', company: '', duration: '' }],
    projects: Array.isArray(location.state.projects)
      ? location.state.projects.map((p) => p.project || p)
      : location.state.projects
      ? [location.state.projects.project || location.state.projects]
      : [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      return { ...prev, education: updatedEducation };
    });
  };

  const handleCertificateChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedCertificates = [...prev.certificates];
      updatedCertificates[index] = {
        ...updatedCertificates[index],
        [field]: value,
      };
      return { ...prev, certificates: updatedCertificates };
    });
  };

  const handleSoftSkillChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.softSkills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [field]: value,
      };
      return { ...prev, softSkills: updatedSkills };
    });
  };

  const handleTechStackChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedStack = [...prev.techStack];
      updatedStack[index] = {
        ...updatedStack[index],
        [field]: value,
      };
      return { ...prev, techStack: updatedStack };
    });
  };

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...formData.testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value,
    };
    setFormData({ ...formData, testimonials: updatedTestimonials });
  };

  const handleProjectChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return { ...prev, projects: updatedProjects };
    });
  };

  const handleCareerChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedCareer = [...prev.career];
      updatedCareer[index] = {
        ...updatedCareer[index],
        [field]: value,
      };
      return { ...prev, career: updatedCareer };
    });
  };

  /**
   * Handles the submission of the form by sending a PATCH request to the server
   * with the updated form data. If the request is successful, it sets the modal
   * message to "Profile Edited Successfully!" and navigates to the home page after
   * a delay of 2 seconds. Otherwise, it sets the modal message to an error message
   * and displays it. If there is a network error, it sets the modal message to
   * "Network error: <error message>".
   *
   * @param {Event} event - The submit event triggered by the form.
   * @return {Promise<void>} A promise that resolves when the form submission is complete.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["authorization"] = `Bearer ${JSON.parse(
        token
      )}`;

      const payload = {
        ...formData,
        department: formData.department.toUpperCase(),
        role: formData.role.toUpperCase(),
      };

      const response = await axios.patch(
        `http://localhost:3000/profile`,
        payload
      );

      // Axios: response.status and response.data
      if (response.status === 200) {
        setModalMessage("Profile Edited Successfully!");
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
          navigate("/home");
        }, 2000);
      } else {
        setModalMessage(
          `Error: ${
            response.data?.ProblemUpdating || "Failed To Edit Profile"
          }`
        );
        setModalOpen(true);
      }
    } catch (error) {
      setModalMessage(
        `Network error: ${
          error.response?.data?.ProblemUpdating || error.message
        }`
      );
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="custom-submit-modal-overlay">
          <div className="custom-submit-modal">
            <p>{modalMessage}</p>
            {!modalMessage.includes("Successfully") && (
              <button
                onClick={() => setModalOpen(false)}
                className="remove-profile-pic-btn"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
      <div className="app-layout">
        <SideBar />

        <div className="edit-profile-body">
          <div className="edit-profile-content-header">
            <h3>Edit Profile</h3>
          </div>

          <div className="edit-submit-section">
            <div className="submit-form-header">
              <h3>Basic Information</h3>
              <SquarePen className="submit-icon" color="#084677" size={17} />
            </div>
            <br />
            <div className="edit-form-text-section">
              <div className="edit-right-form-section">
                <div className="edit-form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Surname</label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Cellphone</label>
                  <input
                    type="text"
                    name="cellphone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="edit-left-form-section">
                <div className="edit-form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Availability</label>
                  <select
                    id=""
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Your Status
                    </option>
                    <option value="true">Yes (Available)</option>
                    <option value="false">No (Unavailable)</option>
                  </select>
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Experience</label>
                  <select
                    name="experience"
                    id=""
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Years
                    </option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-4 Years">3-4 Years</option>
                    <option value="4-5 Years">4-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="edit-submit-section">
            <div className="submit-form-header">
              <h3>Skills & Education</h3>
              <SquarePen className="submit-icon" color="#084677" size={17} />
            </div>
            <br />
            <div className="edit-form-text-section">
              <div className="edit-right-form-section">
                {formData.education.map((edu, idx) => (
                  <div key={idx} className="education-section">
                    <div className="edit-form-group">
                      <label className="form-label">Qualification</label>
                      <input
                        type="text"
                        value={edu.qualification || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            idx,
                            "qualification",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="edit-form-group">
                      <label className="form-label">Institution</label>
                      <input
                        type="text"
                        value={edu.institution || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            idx,
                            "institution",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <div className="edit-form-group">
                  <label className="form-label">Tech Stack</label>
                  <div className="tech-stack-list">
                    {formData.techStack.map((tech, idx) => (
                      <div
                        key={idx}
                        className="tech-stack-item"
                        style={{ marginBottom: "20px" }}
                      >
                        <select
                          value={tech.Techrating || ""}
                          onChange={(e) =>
                            handleTechStackChange(
                              idx,
                              "Techrating",
                              e.target.value
                            )
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

                        <span
                          className="badge-default"
                          style={{
                            marginRight: 8,
                            width: "fit-content",
                            height: "fit-content",
                            display: "flex",
                            marginBottom: 7,
                          }}
                        >
                          {tech.techStack?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="edit-left-form-section">
                {formData.certificates.map((cert, idx) => (
                  <div key={idx} className="certificate-section">
                    <div className="edit-form-group">
                      <label className="form-label">
                        Certificate {idx + 1}
                      </label>
                      <input
                        type="text"
                        value={cert.name || ""}
                        onChange={(e) =>
                          handleCertificateChange(idx, "name", e.target.value)
                        }
                      />
                    </div>

                    <div className="edit-form-group">
                      <label className="form-label">
                        Certificate Institution {idx + 1}
                      </label>
                      <input
                        type="text"
                        value={cert.institution || ""}
                        onChange={(e) =>
                          handleCertificateChange(
                            idx,
                            "institution",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <div className="edit-form-group">
                  <label className="form-label">Soft Skills</label>
                  <div className="soft-skills-list">
                    {formData.softSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="soft-skill-item"
                        style={{ marginBottom: "20px" }}
                      >
                        <select
                          value={skill.skillsRating || ""}
                          onChange={(e) =>
                            handleSoftSkillChange(
                              idx,
                              "skillsRating",
                              e.target.value
                            )
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

                        <span
                          className="badge-default"
                          style={{
                            marginRight: 8,
                            width: "fit-content",
                            height: "fit-content",
                            display: "flex",
                            marginBottom: 7,
                          }}
                        >
                          {skill.softSkill?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-submit-section">
            <div className="submit-form-header">
              <h3>Testimonials & Links</h3>
              <SquarePen className="submit-icon" color="#084677" size={17} />
            </div>
            <br />
            <div className="edit-form-text-section">
              <div className="edit-right-form-section">
                <div className="edit-form-group">
                  <label className="form-label">GitHub</label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-form-group">
                  <label className="form-label">Portfolio</label>
                  <input
                    type="text"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="edit-left-form-section">
                {formData.testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-edit-group">
                    <div className="edit-form-group">
                      <label className="form-label">
                        Testimonial Company {index + 1}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={testimonial.company}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="edit-form-group">
                      <label className="form-label">Testimonial Quote</label>
                      <input
                        type="text"
                        name="quote"
                        value={testimonial.quote}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "quote",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="edit-form-group">
                      <label className="form-label">
                        Testimonial Reference
                      </label>
                      <input
                        type="text"
                        name="reference"
                        value={testimonial.reference}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "reference",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="edit-submit-section">
            <div className="submit-form-header">
              <h3>Projects & Career Chronology</h3>
              <SquarePen className="submit-icon" color="#084677" size={17} />
            </div>
            <br />
            <div className="edit-form-text-section">
              <div className="edit-right-form-section">
                {formData.projects.map((project, idx) => (
                  <div key={idx} className="project-edit-group">
                    <div className="edit-form-group">
                      <label className="form-label">
                        Project Name {idx + 1}
                      </label>
                      <input
                        type="text"
                        value={project.name || ""}
                        onChange={(e) =>
                          handleProjectChange(idx, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="edit-form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        type="text"
                        value={project.description || ""}
                        onChange={(e) =>
                          handleProjectChange(
                            idx,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="edit-form-group">
                      <label className="form-label">GitHub</label>
                      <input
                        type="text"
                        value={project.github || ""}
                        onChange={(e) =>
                          handleProjectChange(idx, "github", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="edit-left-form-section">
                {formData.career.map((job, idx) => (
                  <div key={idx} className="career-edit-group">
                    <div className="edit-form-group">
                      <label className="form-label">Role {idx + 1}</label>
                      <input
                        type="text"
                        value={job.role || ""}
                        onChange={(e) =>
                          handleCareerChange(idx, "role", e.target.value)
                        }
                      />
                    </div>
                    <div className="edit-form-group">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        value={job.company || ""}
                        onChange={(e) =>
                          handleCareerChange(idx, "company", e.target.value)
                        }
                      />
                    </div>
                    <div className="edit-form-group">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        value={job.duration || ""}
                        onChange={(e) =>
                          handleCareerChange(idx, "duration", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="edit-profile-edit-btn-container">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <button className="edit-profile-edit-btn" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
