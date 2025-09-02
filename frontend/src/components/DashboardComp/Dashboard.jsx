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

  console.log("on the dash",props.testEmployee);
  
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
            <Link
              target="_blank"
              to={
                props.testEmployee.linkedIn.includes("https")
                  ? props.testEmployee.linkedIn
                  : "https://" + props.testEmployee.linkedIn
              }
            >
              <img src={LinkedIn} alt="LinkedIn" className="socials" />
            </Link>
          )}

          {props.testEmployee.email && (
            <Link to={`mailto: ${props.testEmployee.email}`}>
              <img src={Email} alt="Email" className="socials" />
            </Link>
          )}

          {props.testEmployee.portfolio && (
            <Link target="_blank" to={props.testEmployee.portfolio}>
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                fill="none"
                color="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 7L11.8845 4.76892C11.5634 4.1268 11.4029 3.80573 11.1634 3.57116C10.9516 3.36373 10.6963 3.20597 10.4161 3.10931C10.0992 3 9.74021 3 9.02229 3H5.2C4.0799 3 3.51984 3 3.09202 3.21799C2.71569 3.40973 2.40973 3.71569 2.21799 4.09202C2 4.51984 2 5.0799 2 6.2V7M2 7H17.2C18.8802 7 19.7202 7 20.362 7.32698C20.9265 7.6146 21.3854 8.07354 21.673 8.63803C22 9.27976 22 10.1198 22 11.8V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V7ZM14 16.5L16.5 14L14 11.5M10 11.5L7.5 14L10 16.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          )}
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
