import { useRef, useState, useEffect } from "react";
import projects from "../../../modal-resources/projects-modal.json";
// import "./userProfileOverview.css";

function UserProfileOverview(props) {
  const trackRef = useRef(null);
    const intervalRef = useRef(null);
  
    // Combined function that handles both animation and styling
    const updateStyles = () => {
      if (!trackRef.current) return;
  
      const items = trackRef.current.querySelectorAll(".video-item");
  
      items.forEach((item, index) => {
        item.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        item.style.position = "absolute";
  
        if (index === 0) {
          item.style.transform = "translateX(0) scale(1)";
          item.style.zIndex = 3;
          item.style.opacity = 1;
        } else if (index === 1) {
          item.style.transform = "translateX(330px) scale(0.85)";
          item.style.zIndex = 2;
          item.style.opacity = 0.9;
        }
        else {
          // Cards beyond 3rd: push them far right and hide
          item.style.transform = `translateX(900px) scale(0.5)`;
          item.style.zIndex = 0;
          item.style.opacity = 0;
        }
      });
    };
  const startAnimation = () => {
    // First apply the initial styles
    updateStyles();

    // Then set up the interval for animation
    intervalRef.current = setInterval(() => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const items = track.querySelectorAll(".video-item");

      // Add transition class for sliding effect
      items.forEach((item) => {
        item.classList.add("slide-left");
      });

      // After transition completes, move the first item to the end and reset styles
      setTimeout(() => {
        const firstItem = items[0];
        track.appendChild(firstItem);
        items.forEach((item) => item.classList.remove("slide-left"));
        updateStyles(); // Re-apply styles after DOM changes
      }, 500);
    }, 3000);
  };const stopAnimation = () => {
      clearInterval(intervalRef.current);
    };
  
    useEffect(() => {
      // Initial styles and start animation on mount
      updateStyles();
      startAnimation();
  
      // Clear interval on unmount
      return () => stopAnimation();
    }, []);
    // Modal Code
      const [selectedProject, setSelectedProject] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setSelectedProject(null);
        setIsModalOpen(false);
      };
  
  return (
    <>
      <section className="profile-overview-container">
        <h1 className="profile-overview-title">Hello World!</h1>
        <p className="profile-overview-text">{props.testEmployee.bio}</p>
        <section className="testimonial-overview-section">
          {Array.isArray(props.testEmployee.testimonials).length === 3 ? (
            <div className="testimonial-content">
              {props.testEmployee.testimonials.map((t, i) => (
                <div key={i} className="testimonial-item">
                  <p className="testimonial-text">{t.quote}</p>
                  <p className="testimonial-name">{t.reference}</p>
                  <p className="testimonial-company">{t.company}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="static-testimonial-content">
              {props.testEmployee.testimonials.map((t, i) => (
                <div key={i} className="testimonial-item">
                  <p className="testimonial-text">{t.quote}</p>
                  <p className="testimonial-name">{t.reference}</p>
                  <p className="testimonial-company">{t.company}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <h2 className="profile-overview-ft-Projects">Featured Projects</h2>
        <section className="overview-video-header">
          <div
            className="overview-video-carousel"
            onMouseEnter={stopAnimation}
            onMouseLeave={startAnimation}
          >
            <div className="video-track" ref={trackRef}>
              {props.testEmployee.projects.map((project, index) => (
                <div key={index} className="video-item">
                  <img
                    className="overview-video-item-image"
                    src={
                      project.project.screenshot ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt=" Project Screenshot"
                  />

                  <div className="video-item-text">
                    <div className="video-item-text-inner">
                      <h3>{project.project.name}</h3>
                      <p>{project.project.description}</p>
                    </div>
                    <div
                      className="video-see-more"
                      onClick={() => openModal(project.project)}
                    >
                      See More
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {isModalOpen && selectedProject && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* <button className="modal-close" onClick={closeModal}>
              X
            </button> */}

              <div className="modal-header">
                <h2>{selectedProject.name}</h2>{" "}
                <div className="modal-owner-container">
                  <img
                    src={
                      selectedProject.avatar
                    }
                    alt={selectedProject.name}
                    className="modal-owner-img"
                  />
                  <p className="modal-owner">{selectedProject.owner}</p>
                </div>
              </div>

              {selectedProject.video && (
                <video
                  src={selectedProject.video}
                  controls
                  width="100%"
                  style={{ borderRadius: "5px" }}
                />
              )}

              <p className="modal-description">
                <strong>Description:</strong> <br />
                {selectedProject.description}
              </p>

              <h4 className="modal-technologies">Technologies Used:</h4>
              <ul className="flex-row gap-10-px align-items-center font-size-12-px badge-list">
                {/* {selectedProject.technologies.map((tech, index) => (
                  <li key={index}>
                    <p className="badge-default">{tech}</p>
                  </li>
                ))} */}
                {Array.isArray(selectedProject.techStack) &&
                  selectedProject.techStack.map((tech, idx) => (
                    <li key={idx} className="project-tag">
                      {tech.techStack?.name}
                    </li>
                  ))}
              </ul>

              <button className="modal-project-link">
                <a href={selectedProject.link}>Repository</a>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default UserProfileOverview;
