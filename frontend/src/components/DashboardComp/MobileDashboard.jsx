import {
  Activity,
  Award,
  Calendar,
  CalendarCheck,
  MapPin,
  Pin,
  PinIcon,
} from "lucide-react";

import { Link } from "react-router";
import Github from "../../assets/icons8-github-100.png";
import LinkedIn from "../../assets/icons8-linkedin-100.png";
import Email from "../../assets/icons8-email-100.png";
import { Edit05 } from "@untitled-ui/icons-react";

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
        </div>
        <div className="mobile-name-availability">
          <p className="profile-name">{user.testEmployee.name}</p>
          <div className="profile-edit-icon">
            <Link to="/edit-profile" state={user.testEmployee}>
              <button className="profile-edit-btn"><Edit05/></button>
            </Link>
            
          </div>
          
        </div>
        <div className="mobile-user-exeperience">
          <div className="user-role">
            <p className="profile-role">
              <strong>{user.testEmployee.role}</strong>
            </p>
            <p className="profile-role">
              <Award size={15} className="dashboard-icon" />
              {user.testEmployee.experienced
                ? user.testEmployee.experienced
                : "Not filled / N/A "}
            </p>
          </div>
          <p className="profile-role">
            {/* <Activity size={15} className="dashboard-icon" /> */}
            <CalendarCheck size={15} className="dashboard-icon" />
            {user.testEmployee.availability === null
              ? "Not filled / N/A"
              : user.testEmployee.availability
                ? "Available"
                : "Not Available"}
          </p>
        </div>
        <div className="mobile-socials">
          <p className="profile-role">
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
