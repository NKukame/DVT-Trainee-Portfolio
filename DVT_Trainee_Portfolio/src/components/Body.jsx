import React, { useState, useEffect, useRef } from "react";
import "./Body.css";
import profileIcon from "../assets/placeholder.png";
import projects from "../modal-resources/projects-modal.json";
import { useNavigate } from "react-router-dom";



function Body() {
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/team-portfolio.json")
      .then((response) => response.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error("Error loading team data:", error));
  }, []);

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
      } else if (index === 2) {
        item.style.transform = "translateX(580px) scale(0.7)";
        item.style.zIndex = 1;
        item.style.opacity = 0.7;
      } else {
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
  };

  const stopAnimation = () => {
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
    <div className="container">
      <div className="content">
        <h1 id="theTitle">Meet our newest cadets</h1>
        <h2>
          Welcome our class of 2025 and get ready to be blown away! This group
          of fresh talent is expertly trained and ready to invigorate your team
        </h2>
      </div>

      <div className="home-carousel-wrapper">
        <div className="home-carousel">
          {team.concat(team).map((person, index) => (
            <div key={index} className="home-carousel-item">
              <img
                src={person.image}
                alt={person.name}
                className="home-carousel-item-img"
              />
              <div className="home-carousel-item-text">
                <h3>{person.name}</h3>
                <p>{person.description}</p>
                <ul className="flex-row gap-10-px align-items-center font-size-12-px badge-list-white flex-wrap m-10px">
                  {(Array.isArray(person.techStack)
                    ? person.techStack
                    : []
                  ).map((tech, index) => (
                    <li key={index}>
                      <p className="badge-default" style={{ paddingInline: "5px" }}>{tech}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-content">
        <div className="home-bottom">
          <p>
            Discover the bright minds shaping the future of technology at our
            company and beyond.These talented individuals bring fresh
            perspectives, cutting-edge skills, and unbridled enthusiasm to our
            team.
          </p>

          <button className="cta-button" onClick={() => navigate("/about")}>
            <img src="./IconCTA.png" alt="" /> &nbsp; The Team
          </button>

        </div>
      </div>

      <div className="video-header">
        <h2 id="theTitle">See What They're Doing</h2>
      </div>

      <div
        className="video-carousel"
        onMouseEnter={stopAnimation}
        onMouseLeave={startAnimation}
      >
        <div className="video-track" ref={trackRef}>
          {projects.map((project, index) => (
            <div key={index} className="video-item">
              <img src={project.image} alt="Video Thumbnail" />

              <div className="video-item-text">
                <div className="video-item-text-inner">
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                </div>
                <div
                  className="video-see-more"
                  onClick={() => openModal(project)}
                >
                  See More
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-content video-bottom">
        <div className="home-bottom">
          <p>
            Our talented team continues to drive meaningful progress through
            their innovative projects and collaborative approach. They are
            consistently developing creative solutions, leveraging their diverse
            skills to tackle complex challenges and generate impactful results
            across multiple domains.
          </p>
          <button className="cta-button video-cta-button"  onClick={() => navigate("/search?isProject=true")}>
            <img src="./IconCTA.png" alt="" /> &nbsp; The Work
          </button>
        </div>
      </div>
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* <button className="modal-close" onClick={closeModal}>
              X
            </button> */}

            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <div className="modal-owner-container">
                <img src={selectedProject.ownerimage} alt="" className="modal-owner-img" />
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
              <strong>Description:</strong> <br />{selectedProject.description}
            </p>

            <h4 className="modal-technologies">Technologies Used:</h4>
            <ul className="flex-row gap-10-px align-items-center font-size-12-px badge-list">
              {selectedProject.technologies.map((tech, index) => (
                (<li key={index}><p className='badge-default'>{tech}</p></li>)
              ))}
            </ul>


          </div>
        </div>
      )}
    </div>
  );
}

export default Body;
