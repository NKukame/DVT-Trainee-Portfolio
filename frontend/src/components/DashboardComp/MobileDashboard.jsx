import {
  Activity,
  Award,
  Calendar,
  CalendarCheck,
  MapPin,
  Pin,
  PinIcon,
} from "lucide-react";

import { Link } from "react-router-dom";
import Github from "../../assets/icons8-github-100.png";
import LinkedIn from "../../assets/icons8-linkedin-100.png";
import Email from "../../assets/icons8-email-100.png";

export function MobileDashboard({ user, tokenID, id }) {
  return (
    <>
      <div className="mobile-dashboard-container">
        <div className="user-caption">
          <div className="mobile-profile-pic">
            <img
              src={user.testEmployee.avatar}
              alt="profile"
              className="profile-img"
            />
          </div>
          <div className="profile-info">
            {id === tokenID ? (
              <Link to="/profile-creation" state={user.testEmployee}>
                <button className="manage-prfl">Edit Profile</button>
              </Link>
            ) : (
              <Link to="/profile-creation" state={user.testEmployee}>
                <button className="manage-prfl disabled" disabled>
                  Edit Profile
                </button>
              </Link>
            )}
            <Link to="/generate-cv" state={user.testEmployee}>
              <button className="manage-prfl">Generate Resume</button>
            </Link>
          </div>
        </div>
        <div className="mobile-name-availability">
          <p className="profile-name">{user.testEmployee.name}</p>
          <p>
            {/* <Activity size={15} className="dashboard-icon" /> */}
            <CalendarCheck size={15} className="dashboard-icon" />
            {user.testEmployee.availability === null
              ? "Not filled / N/A"
              : user.testEmployee.availability
                ? "Available"
                : "Not Available"}
          </p>
        </div>
        <div className="mobile-user-exeperience">
          <p className="profile-role">
            <strong>{user.testEmployee.role}</strong>
          </p>
          <p>
            <Award size={15} className="dashboard-icon" />
            {user.testEmployee.experienced
              ? user.testEmployee.experienced
              : "Not filled / N/A "}
          </p>
        </div>
        <div className="mobile-socials">
          <p>
            <MapPin size={15} className="dashboard-icon" />
            {user.testEmployee.location
              ? user.testEmployee.location
              : "Not filled / N/A"}
          </p>

          <footer className="footer">
            <Link to={user.testEmployee.github}>
              <img src={Github} alt="GitHub" className="socials" />
            </Link>

            <Link to={user.testEmployee.linkedIn}>
              <img src={LinkedIn} alt="LinkedIn" className="socials" />
            </Link>

            <Link to={`mailto: ${user.testEmployee.email}`}>
              <img src={Email} alt="Email" className="socials" />
            </Link>
          </footer>
        </div>
        <div className="proficiencies">
          <h2>Proficiencies</h2>
          <ul className="proficiency-list">
            {user.testEmployee.techStack.map((skill, index) => (
              <li key={index} className="skill-tag">
                {skill.techStack.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
