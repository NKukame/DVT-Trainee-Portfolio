import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { SquarePen } from "lucide-react";

function SubmitForm({
  basicInfo,
  skills,
  career,
  testimonials,
  links,
  status,
  incompleteSteps = [],
  stepData = [],
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const incompleteSectionTitles = incompleteSteps
    .filter((idx) => stepData[idx] && stepData[idx].title !== "Submit")
    .map((idx) => stepData[idx]?.title);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/create-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        basicInfo,
        skills,
        career,
        testimonials,
        links,
        status,
      }),
    });
    if (response.ok) {
      setModalMessage("Profile submitted successfully!");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        navigate("/userportfolio"); 
      }, 2000);
    } else {
      const data = await response.json();
      setModalMessage("Error: " + (data.error || "Failed to submit profile"));
      setModalOpen(true);
    }
  } catch (error) {
    setModalMessage("Network error: " + error.message);
    setModalOpen(true);
  }
};

  return (
    <>
      {modalOpen && (
        <div className="custom-submit-modal-overlay">
          <div className="custom-submit-modal">
            <p>{modalMessage}</p>
            {!modalMessage.includes("successfully") && (
              <button onClick={() => setModalOpen(false)} className="remove-profile-pic-btn">Close</button>
            )}
          </div>
        </div>
      )}
      <form className="submit-form-container" onSubmit={handleSubmit}>
        {incompleteSectionTitles.length > 0 && (
          <div className="submit-warning-box">
            <strong>
              Please complete the following sections before submission:
            </strong>
            <ul>
              {incompleteSectionTitles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="basic-info-submit-section">
          <div className="submit-form-header">
            <h3>Basic Information</h3>
            <SquarePen className="submit-icon" color="#084677" size={17} />
          </div>

          <div className="submit-form-text-section">
            <div className="submit-right-form-section">
              <div className="submit-form-group">
                <label className="form-label">Title</label>
                <p className="form-value">{basicInfo?.title || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Name</label>
                <p className="form-value">{basicInfo?.firstName || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Last Name</label>
                <p className="form-value">{basicInfo?.lastName || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Email</label>
                <p className="form-value">{basicInfo?.email || "-"}.</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Cellphone</label>
                <p className="form-value">{basicInfo?.phone || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Introduction</label>
                <p className="form-value">
                  {basicInfo?.introductionDescription || "-"}
                </p>
              </div>
            </div>

            <div className="submit-left-form-section">
              <div className="submit-form-group">
                <label className="form-label">Role</label>
                <p className="form-value">{basicInfo?.role || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Company</label>
                <p className="form-value">{basicInfo?.company || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Experience</label>
                <p className="form-value">{basicInfo?.experience || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Location</label>
                <p className="form-value">{basicInfo?.location || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Birthday</label>
                <p className="form-value">{basicInfo?.birthday || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-form-line"></div>

        <div className="skills-submit-section">
          <div className="submit-form-header">
            <h3>Skills & Educations</h3>
            <SquarePen className="submit-icon" color="#084677" size={17} />
          </div>

          <div className="submit-form-text-section">
            <div className="submit-right-form-section">
              <div className="submit-form-group">
                <label className="form-label">Education</label>
                <div className="form-value">
                  {skills?.educationEntries &&
                  skills.educationEntries.length > 0
                    ? skills.educationEntries
                        .filter(
                          (entry) => entry.qualification || entry.institution
                        )
                        .map((entry, idx) => (
                          <div key={idx}>
                            {entry.qualification} - {entry.institution}
                          </div>
                        ))
                    : "-"}
                </div>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Tech Stack</label>
                <div className="form-value">
                  {skills?.selectedTechnologies &&
                  skills.selectedTechnologies.length > 0
                    ? skills.selectedTechnologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="badge-default"
                          style={{
                            marginRight: 4,
                            width: "fit-content",
                            display: "inline-block",
                            marginBottom: 4,
                          }}
                        >
                          {tech}
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
            </div>

            <div className="submit-left-form-section">
              <div className="submit-form-group">
                <label className="form-label">Certifications</label>
                <div className="form-value">
                  {skills?.certificationEntries &&
                  skills.certificationEntries.length > 0
                    ? skills.certificationEntries
                        .filter(
                          (entry) => entry.certificate || entry.institution
                        )
                        .map((entry, idx) => (
                          <div key={idx}>
                            {entry.certificate} - {entry.institution}
                          </div>
                        ))
                    : "-"}
                </div>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Soft Skills</label>
                <div className="form-value">
                  {skills?.selectedSoftSkills &&
                  skills.selectedSoftSkills.length > 0
                    ? skills.selectedSoftSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="badge-default"
                          style={{
                            marginRight: 4,
                            width: "fit-content",
                            display: "inline-block",
                            marginBottom: 4,
                          }}
                        >
                          {skill}
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-form-line"></div>

        <div className="career-submit-section">
          <div className="submit-form-header">
            <h3>Career</h3>
            <SquarePen className="submit-icon" color="#084677" size={17} />
          </div>

          <div className="submit-form-text-section">
            <div className="submit-right-form-section">
              <div className="submit-form-group">
                <label className="form-label">Chronology</label>
                <div className="form-value">
                  {career?.careerEntries && career.careerEntries.length > 0
                    ? career.careerEntries
                        .filter(
                          (entry) =>
                            entry.role || entry.company || entry.duration
                        )
                        .map((entry, idx) => (
                          <div key={idx}>
                            {entry.role} at {entry.company} ({entry.duration})
                          </div>
                        ))
                    : "-"}
                </div>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Department</label>
                <div className="form-value">{career?.department || "-"}</div>
              </div>
            </div>

            <div className="submit-left-form-section">
              <div className="submit-form-group">
                <label className="form-label">Projects</label>
                <div className="form-value">
                  {career?.projects && career.projects.length > 0
                    ? career.projects
                        .filter((proj) => proj.name)
                        .map((proj, idx) => <div key={idx}>{proj.name}</div>)
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-form-line"></div>

        <div className="testimonial-submit-section">
          <div className="submit-form-header">
            <h3>Testimonials</h3>
            <SquarePen className="submit-icon" color="#084677" size={17} />
          </div>

          <div className="submit-form-text-section">
            <div className="submit-right-form-section">
              <div className="submit-form-group">
                <label className="form-label">Clients</label>
                <div className="form-value">
                  {testimonials?.clients && testimonials.clients.length > 0
                    ? testimonials.clients.map((client, idx) => (
                        <div key={idx}>{client}</div>
                      ))
                    : "-"}
                </div>
              </div>
            </div>

            <div className="submit-left-form-section">
              <div className="submit-form-group">
                <label className="form-label">Testimonials</label>
                <div className="form-value">
                  {testimonials?.testimonials &&
                  testimonials.testimonials.length > 0
                    ? testimonials.testimonials.map((t, idx) => (
                        <div key={idx}>
                          {t.reference} - {t.company}
                        </div>
                      ))
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-form-line"></div>

        <div className="links-submit-section">
          <div className="submit-form-header">
            <h3>Links</h3>
            <SquarePen className="submit-icon" color="#084677" size={17} />
          </div>

          <div className="submit-form-text-section">
            <div className="submit-right-form-section">
              <div className="submit-form-group">
                <label className="form-label">GitHub</label>
                <p className="form-value">{links?.github || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">LinkedIn</label>
                <p className="form-value">{links?.linkedin || "-"}</p>
              </div>
            </div>

            <div className="submit-left-form-section">
              <div className="submit-form-group">
                <label className="form-label">Portfolio</label>
                <p className="form-value">{links?.portfolio || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-form-line"></div>

        <div className="status-submit-section">
          <div className="submit-form-header">
            <h3>Status</h3>
            <SquarePen className="submit-icon" color="#084677" size={17} />
          </div>

          <div className="submit-form-text-section">
            <div className="submit-right-form-section">
              <div className="submit-form-group">
                <label className="form-label">Availability</label>
                <p className="form-value">{status?.status || "-"}</p>
              </div>
            </div>

            <div className="submit-left-form-section">
              <div className="submit-form-group">
                <label className="form-label">Client</label>
                <p className="form-value">{status?.assignedClient || "-"}</p>
              </div>

              <div className="submit-form-group">
                <label className="form-label">Duration</label>
                <p className="form-value">
                  {status?.assessmentStart && status?.assessmentEnd
                    ? `${status.assessmentStart.replace(
                        /-/g,
                        "/"
                      )} - ${status.assessmentEnd.replace(/-/g, "/")}`
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="submit-form-line"></div>

        <div className="submit-form-footer">
          <div className="submit-form-checkbox">
            <input
              type="checkbox"
              id="confirm-submit"
              name="confirm-submit"
              required
            />
            <label htmlFor="confirm-submit">
              I hereby accept the terms & conditions of the DVT Employee Portal
            </label>
          </div>

          <div className="submit-form-checkbox">
            <input
              type="checkbox"
              id="confirm-submit"
              name="confirm-submit"
              required
            />
            <label htmlFor="confirm-submit">
              I hereby accept the terms & conditions of the DVT Information
              Sharing Policy
            </label>
          </div>

          <div className="submit-form-button-container">
            <button className="submit-form-button" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SubmitForm;
