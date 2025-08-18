import { useLocation } from "react-router-dom";
import { useState } from "react";
import SideBar from "../../components/SidebarComp/SideBar";
import { SquarePen } from "lucide-react";
import "./EditProfile.css";

function EditProfile(prop) {
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: location.state.title || "",
    name: location.state.name?.split(" ")[0] || "",
    surname: location.state.surname || "",
    email: location.state.email || "",
    phone: location.state.phone || "",
    role: location.state.role || "",
    company: location.state.company || "",
    bio: location.state.bio || "",
    location: location.state.location || "",
    experience: location.state.experienced || "",
    education: Array.isArray(location.state.emp_education)
    ? location.state.emp_education
    : [location.state.emp_education],
    certificates: Array.isArray(location.state.certificates)
    ? location.state.certificates
    : [location.state.certificates],
    softSkilled: Array.isArray(location.state.softSkilled)
    ? location.state.softSkilled
    : [location.state.softSkilled],
    techStack: Array.isArray(location.state.techStack)
    ? location.state.techStack
    : [location.state.techStack],
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
      const updatedSkills = [...prev.softSkilled];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [field]: value,
      };
      return { ...prev, softSkilled: updatedSkills };
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

  console.log("Form Data:", formData);
  

  return (
    <>
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
              </div>

              <div className="edit-left-form-section">
                <div className="edit-form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="loaction"
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
                    {formData.softSkilled.map((skill, idx) => (
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
              </div>

              <div className="edit-left-form-section">
                <div className="edit-form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="loaction"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
