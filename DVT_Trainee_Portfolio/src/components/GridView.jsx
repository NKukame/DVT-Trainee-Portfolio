import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GridView.css"; 

const GridView = ({ team }) => {
  return (
    <section className="grid-wrapper">
      <div className="grid-container">
        {team.map((member, index) => (
          <div key={index} className="grid-portfolio-card">
            <div
              className="grid-profile-pic"
              style={{ backgroundImage: `url(${member.image})` }}
            >
              
            </div>

            <div className="grid-title-container">

              <p className="grid-portfolio-card-title">{member.name}</p>

              <div className="grid-portfolio-card-content">
                <p className="grid-portfolio-card-description">{member.description}</p>
                <p className="grid-portfolio-card-description">{member.techStack}</p>
              </div>

            </div>

            
          </div>
        ))}
      </div>
    </section>
  );
};


export default GridView;
