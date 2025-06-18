import { useRef, useState, useEffect } from "react";
import "./userProfileOverview.css";

function UserProfileOverview() {
  const projects = [
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Discovery Health",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Tech Innovations",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    },
    {
      name: "Zara Hadid",
      company: "Tech Innovations",
      description:
        "“What a wonderful fantastic energy Paballo always brought to the team, its such a shame what happened to her.”",
    }
    
  ];
  return (
    <>
      <section className="profile-overview-container">
        <h1 className="profile-overview-title">Hello World!</h1>
        <p className="profile-overview-text">
          I am a vibrant dev that likes biscuits and eating tea bags. I am a
          vibrant dev that likes biscuits and eating tea bags.I am a vibrant dev
          that likes biscuits and eating tea bags.I am a vibrant dev that likes
          biscuits and eating tea bags. I am a vibrant dev that likes biscuits
          and eating tea bags.I am a vibrant dev that likes biscuits and eating
          tea bags.I am a vibrant dev that likes biscuits and eating tea bags.
        </p>
        <div className="testimonial-overview-section">
          <div className="testimonial-content">
            {projects.map((project, index) => (
              <div className="testimonial-item" key={index}>
                <p className="testimonial-text">{project.description}</p>
                <div>
                  <p className="testimonial-name">{project.name}</p>
                  <p className="testimonial-company">{project.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="profile-overview-ft-Projects">Featured Projects</h2>

        
      </section>
    </>
  );
}

export default UserProfileOverview;
