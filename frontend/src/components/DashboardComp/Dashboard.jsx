import React from "react";
import { Link } from "react-router";
import ProfileImage from "../../assets/icons8-profile-picture-100.png";
import Calender from "../../assets/icons8-calendar-100.png";
import Location from "../../assets/icons8-location-100.png";
import Medal from "../../assets/icons8-medal-100.png";
import Github from "../../assets/icons8-github-100.png";
import LinkedIn from "../../assets/icons8-linkedin-100.png";
import Email from "../../assets/icons8-email-100.png";
import award from "../../assets/Award-01.png";
import axios from "axios";
import {
  Activity,
  Award,
  Calendar,
  CalendarCheck,
  MapPin,
  Pin,
  PinIcon,
} from "lucide-react";
import { MobileDashboard } from "./MobileDashboard";

function Dashboard(props) {
  const id = props.testEmployee.user.id;
  const tokenID = localStorage.getItem("userId").split('"')[1];
  return (
    <>
      <MobileDashboard id={id} tokenID={tokenID} user={props} />

      <div className="dashboard">
        <div className="profile">
          <div className="short-bio">
            <div className="dashboard-profile-picture">
              <img
                src={props.testEmployee.avatar}
                className="profile-img"
                alt="Profile"
              />
            </div>

            <p className="profile-name">{props.testEmployee.name}</p>
            <p className="profile-role">
              <strong>{props.testEmployee.role}</strong>
            </p>
          </div>

          <div className="profile-info">
            {id === tokenID && (
              <Link to="/edit-profile" state={props.testEmployee}>
                <button className="manage-prfl">Edit Profile</button>
              </Link>
            )}
            {id === tokenID && (
              <Link to="/generate-cv" state={props.testEmployee}>
                <button className="manage-prfl">Generate Resume</button>
              </Link>
            )}
            <div className="profile-details">
              <p>
                <CalendarCheck size={15} className="dashboard-icon" />
                {props.testEmployee.availability === null
                  ? "Not filled / N/A"
                  : props.testEmployee.availability
                  ? "Available"
                  : "Not Available"}
              </p>
              <p>
                <MapPin size={15} className="dashboard-icon" />
                {props.testEmployee.location
                  ? props.testEmployee.location
                  : "Not filled / N/A"}
              </p>
              <p>
                <Award size={15} className="dashboard-icon" />
                {props.testEmployee?.experience ||
                  props.testEmployee?.experienced ||
                  "Not filled / N/A "}
              </p>
            </div>
          </div>
          <div className="proficiencies">
            <h2>Proficiencies</h2>
            <ul className="proficiency-list">
              {props.testEmployee.techStack.map((skill, index) => (
                <li key={index} className="skill-tag">
                  {skill.techStack.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <footer className="footer">
          {props.testEmployee.github && (
            <Link target="_blank" to={props.testEmployee.github}>
              <img src={Github} alt="GitHub" className="socials" />
            </Link>
          )}

          {props.testEmployee.linkedIn && (
            <Link target="_blank" to={props.testEmployee.linkedIn}>
              <img src={LinkedIn} alt="LinkedIn" className="socials" />
            </Link>
          )}

          {props.testEmployee.email && (
            <Link to={`mailto: ${props.testEmployee.email}`}>
              <img src={Email} alt="Email" className="socials" />
            </Link>
          )}
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
