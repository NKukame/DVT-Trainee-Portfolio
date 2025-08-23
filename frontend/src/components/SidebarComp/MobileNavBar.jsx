import { useState, useEffect } from "react";
import dvtlogo from "../../assets/dvt_logo.jpg";
import { useDarkMode } from "../DarkModeComp/DarkModeProvider";

function MobileNavbar() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <div className="mobile-navbar">
      <div className="mobile-top-bar">
        <div>
          <img src={dvtlogo} alt="dvt logo" className="mobilenav-dvtlogo" />
        </div>
        <div className="mobilenav-dvtslogen">
          <span>Smart People</span>
          <p>Smart Solutions</p>
        </div>
      </div>

      <div
        className="profile-modal-btn view-profile-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        <div className="toggle-content">
          {darkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.9548 12.9564C20.5779 15.3717 17.9791 17.0001 15 17.0001C10.5817 17.0001 7 13.4184 7 9.00008C7 6.02072 8.62867 3.42175 11.0443 2.04492C5.96975 2.52607 2 6.79936 2 11.9998C2 17.5227 6.47715 21.9998 12 21.9998C17.2002 21.9998 21.4733 18.0305 21.9548 12.9564Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
