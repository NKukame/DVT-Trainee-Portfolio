import "./Body.css";
import profileIcon from "../assets/placeholder.png";
import React, { useState, useEffect } from "react";

function Body() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch("/team-portfolio.json") 
            .then((response) => response.json())
            .then((data) => setTeam(data))
            .catch((error) => console.error("Error loading team data:", error));
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
                        <img src={person.image} alt={person.name} className="home-carousel-item-img" />
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
          <button className="cta-button">The Team</button>
          
        </div>

      </div>
    </div>
  );
}

export default Body;
