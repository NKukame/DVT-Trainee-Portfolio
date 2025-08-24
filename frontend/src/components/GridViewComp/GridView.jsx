import React, { useState } from "react";
import { Link } from "react-router-dom";

const GridView = ({ team }) => {
  return (
    <section className="grid-wrapper">
      <div className="grid-container">
        {team.map((member, index) => (
          <div key={index} className="grid-portfolio-card">
            <div
              className="grid-profile-pic"
              style={{ backgroundImage: `url(${member.image})` }}
            ></div>

            <div className="grid-title-container">
              <p className="grid-portfolio-card-title">{member.name}</p>

              <div className="grid-portfolio-card-content">
                <p className="grid-portfolio-card-description">
                  {member.description}
                </p>
                <ul className="flex-row gap-10-px align-items-center font-size-12-px badge-list-white flex-wrap py-4-px m-10px">
                  {(Array.isArray(member.techStack)
                    ? member.techStack
                    : []
                  ).map((tech, index) => (
                    <li key={index}>
                      <p className="badge-default">{tech}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridView;
