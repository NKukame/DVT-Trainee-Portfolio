import { useState, useEffect } from "react";

import ProfileModal from "../ProfileModalComp/ProfileModal.jsx";
import dvtlogo from "../../assets/dvt_logo.jpg";
import { useDarkMode } from "../DarkModeComp/DarkModeProvider";

function MobileNavbar() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    profilePicture: null,
    role: "",
  });

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const userId = JSON.parse(localStorage.getItem("userId"));
      
      if (!token || !userId) {
        return;
      }

      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);
        
        setUserInfo({
          name: userData.name,
          email: userData.email,
          profilePicture: userData.avatar,
          role: userData.role,
        });
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  return (
    <>
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

        <div className="view-profile-btn">
          <div className="">
            <div className="sidebar-nav-link">
              <div
                className="homeBtn"
                onClick={() => setIsProfileModalOpen(true)}
              >
                {userInfo.profilePicture ? (
                  <img
                    src={userInfo.profilePicture}
                    alt="Profile"
                    className="profile-picture"
                    width="25"
                    height="25"
                    onError={() =>
                      setUserInfo((prev) => ({ ...prev, profilePicture: null }))
                    }
                  />
                ) : (
                  <svg
                    width="45px"
                    height="45px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
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
        </div>
      </div>

      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userInfo={userInfo}
        />
      )}
    </>
  );
}

export default MobileNavbar;
