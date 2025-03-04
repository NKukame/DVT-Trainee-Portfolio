import React from "react";
import { Link } from "react-router-dom";
import "./GridView.css"; // Ensure you style the grid properly

const GridView = ({ team }) => {
  return (
    <section className="grid-container">
      {team.map((member, index) => (
        <div key={index} className="grid-portfolio-card">
          
            <div className="grid-profile-pic" 
                                style={{ backgroundImage: `url(${member.image})` }}>
            </div>

            <div className="grid-portfolio-card-content">
              <p className="grid-portfolio-card-title">{member.name}</p>
              <p className="grid-portfolio-card-description">
                {member.description}
              </p>
              <p className="grid-portfolio-card-description">
                {member.techStack}
              </p>
              <Link to="/UserPortfolio">
                <button className="grid-profile-card-button">Profile</button>
              </Link>
              
            </div>
          
        </div>
      ))}
    </section>
  );
};

export default GridView;
