import React from "react";
import { Link } from "react-router-dom";
import ProfileImage from "../../assets/icons8-profile-picture-100.png";
import Calender from "../../assets/icons8-calendar-100.png";
import Location from "../../assets/icons8-location-100.png";
import Medal from "../../assets/icons8-medal-100.png";
import Github from "../../assets/icons8-github-100.png";
import LinkedIn from "../../assets/icons8-linkedin-100.png";
import Email from "../../assets/icons8-email-100.png";
import award from "../../assets/Award-01.png";
import "./Dashboard.css";
import axios from "axios";

function Dashboard(props) {
  console.log(props);
  
  return (
    <div className="dashboard">
      <div className="profile">
        <div className="short-bio">
          <div className="profile-picture">
            <img src={props.testEmployee.avatar} className="profile-img" alt="Profile" />
          </div>

          <p className="profile-name">{props.testEmployee.name }</p>
          <p className="profile-role">
            <strong>{props.testEmployee.role}</strong>
          </p>
        
        </div>

        <div className="profile-info">
          <Link to="/profile-creation">
            <button className="manage-prfl">Edit Profile</button>
          </Link>
          <Link to="/ProfileForm">
            <button className="manage-prfl">Generate Resume</button>
          </Link>
          <div className="profile-details">
            <p>
              <img
                src={Calender}
                alt="Experience Icon"
                className="dashboard-icon"
              />
              {props.testEmployee.availability ? props.testEmployee.availability : "Not filled / N/A"}
            </p>
            <p>
              <img
                src={Location}
                alt="Location Icon"
                className="dashboard-icon"
              />
              {props.testEmployee.location ? props.testEmployee.location : "Not filled / N/A"}
            </p>
            <p>
              <img src={award} alt="Role Icon" className="dashboard-icon" />
              {props.testEmployee.experienced ? props.testEmployee.experienced : "Not filled / N/A "} 
            </p>
          </div>
        </div>
        <div className="proficiencies">
          <h2>Proficiencies</h2>
          <ul className="proficiency-list">
            {props.testEmployee.skills.map((skill, index) => (
              <li key={index} className="skill-tag">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="footer">
        <Link to={props.testEmployee.github}>
          <img src={Github} alt="GitHub" className="socials" />
        </Link>

        <Link to={props.testEmployee.linkedIn}>
          <img src={LinkedIn} alt="LinkedIn" className="socials" />
        </Link>

        <Link to={`mailto: ${props.testEmployee.email}`}>
          <img src={Email} alt="Email" className="socials" />
        </Link>
      </footer>
    </div>
  );
}

export default Dashboard;
