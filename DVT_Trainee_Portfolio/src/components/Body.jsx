import "./Body.css";
import profileIcon from "../assets/placeholder.png";
import React, { useState, useEffect,  useRef } from "react";

function Body() {
  const [team, setTeam] = useState([]);

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
                <p>{person.techStack}</p>
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
          <button className="cta-button"><img src="./Icon.png" alt=""  /> &nbsp; The Team</button>
        </div>
      </div>

      <div className="video-header">
        <h2>See What They're Doing</h2>
      </div>
      
      <div className="video-carousel"  onMouseEnter={stopAnimation} onMouseLeave={startAnimation}>
        

        <div className="video-track" ref={trackRef}>
          <div className="video-item">
            <img src={profileIcon} alt="Video Thumbnail" />

            <div className="video-item-text">
              <h3>Video 1</h3>
              <p>Video description goes here.</p>
            </div>
          </div>
          <div className="video-item">
            <img src="https://cdn.pixabay.com/photo/2021/12/04/20/59/animal-6845972_1280.jpg" alt="Video Thumbnail" />
           <div className="video-item-text">
              <h3>Video 1</h3>
              <p>Video description goes here.</p>
            </div>
          </div>
          <div className="video-item">
            <img src="https://cdn.pixabay.com/photo/2024/08/09/12/04/monstera-8957004_1280.jpg" alt="Video Thumbnail" />
            <div className="video-item-text">
              <h3>Video 1</h3>
              <p>Video description goes here.</p>
            </div>
          </div>
          <div className="video-item">
            <img src="https://cdn.pixabay.com/photo/2025/03/19/19/40/square-9481441_1280.jpg" alt="Video Thumbnail" />

            <div className="video-item-text">
              <h3>Video 1</h3>
              <p>Video description goes here.</p>
            </div>
          </div>
          <div className="video-item">
            <img src="https://cdn.pixabay.com/photo/2024/02/22/19/14/mosaic-8590725_1280.jpg" alt="Video Thumbnail" />

            <div className="video-item-text">
              <h3>Video 1</h3>
              <p>Video description goes here.</p>
            </div>
          </div>
        </div>

      </div>

      <div className="home-content video-bottom">
        <div className="home-bottom">
          <p>
          Our talented team continues to drive meaningful progress through their innovative projects and collaborative 
          approach. They are consistently developing creative solutions, leveraging their diverse skills to tackle complex 
          challenges and generate impactful results across multiple domains. 
          </p>
          <button className="cta-button video-cta-button"><img src="./Icon.png" alt=""  /> &nbsp; The Work</button>
        </div>
      </div>


    </div>
  );
}

export default Body;
