import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MobileNavbar() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    profilePicture: null,
  });

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserInfo({
          name: userData.name,
          email: userData.email,
          profilePicture: userData.avatar
            ? `http://localhost:3000${userData.avatar}`
            : null,
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
      {/* Bottom Navbar only visible on small screens */}
      <div className="mobile-navbar">
        <Link to="/home" className="nav-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>

        <Link to="/portfolio" className="nav-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </Link>

        <Link to="/about" className="nav-item">
          <i className="fas fa-info-circle"></i>
          <span>About</span>
        </Link>

        <Link to="/search" className="nav-item">
          <i className="fas fa-search"></i>
          <span>Search</span>
        </Link>

        <div className="nav-item" onClick={() => setIsProfileModalOpen(true)}>
          {userInfo.profilePicture ? (
            <img
              src={userInfo.profilePicture}
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <i className="fas fa-user-circle"></i>
          )}
          <span>{userInfo.name || "Me"}</span>
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
