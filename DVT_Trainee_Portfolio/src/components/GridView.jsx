import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GridView.css"; 

const GridView = ({ team }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to toggle sorting order
  const toggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Sort the team members
  const sortedTeam = [...team].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <section className="grid-wrapper">
      {/* Sorting Button */}
      <button className="sort-button" onClick={toggleSort}>
        Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>

      <div className="grid-container">
        {sortedTeam.map((member, index) => (
          <div key={index} className="grid-portfolio-card">
            <div
              className="grid-profile-pic"
              style={{ backgroundImage: `url(${member.image})` }}
            ></div>

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
      </div>
    </section>
  );
};

export default GridView;
