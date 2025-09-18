import { useState, useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router";
import { useDarkMode } from "../DarkModeComp/DarkModeProvider";
import axios from "axios";

function ProfileModal({ isOpen, onClose, userInfo }) {
  const { darkMode, setDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleViewProfile = () => {
    navigate('/userportfolio');
  };

  const handleRole = () => {
    navigate('/dashboard');
    onClose();
  };

  useEffect(() => {
    if (userInfo?.employee_id) {
      checkBookmarkStatus();
    }
  }, [userInfo?.employee_id]);

  const checkBookmarkStatus = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:3000/api/v2/bookmarks/check/${userInfo.employee_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsBookmarked(response.data.bookmarked);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    if (!userInfo?.employee_id) return;
    
    setBookmarkLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        "http://localhost:3000/api/v2/bookmarks/toggle",
        { employeeId: userInfo.employee_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsBookmarked(response.data.bookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  console.log(userInfo);

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-modal-header">
          <div className="profile-modal-user-info">
            {userInfo?.name ? (
              <h3>{userInfo.name}</h3>
            ) : (
              <div className="form-loader" style={{ margin: '10px 0' }}></div>
            )}
            <p>{userInfo?.email || ""}</p>
          </div>
          <button className="profile-modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="profile-modal-actions">
          <button
            className="profile-modal-btn view-profile-btn"
            onClick={handleViewProfile}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View Profile
          </button>

          <button
            className="profile-modal-btn view-profile-btn"
            onClick={() => {
              navigate('/bookmarks');
              onClose();
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            My Bookmarks
          </button>
          {/* show dashboard button based on role */}
          {userInfo?.role === "ADMIN" && (
            <button
              className="profile-modal-btn view-profile-btn"
              onClick={handleRole}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16V21M12 16L18 21M12 16L6 21M21 3V11.2C21 12.8802 21 13.7202 20.673 14.362C20.3854 14.9265 19.9265 15.3854 19.362 15.673C18.7202 16 17.8802 16 16.2 16H7.8C6.11984 16 5.27976 16 4.63803 15.673C4.07354 15.3854 3.6146 14.9265 3.32698 14.362C3 13.7202 3 12.8802 3 11.2V3M8 9V12M12 7V12M16 11V12M22 3H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View Dashboard
          </button>
          )}

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
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </div>
          </div>

          <button
            className="profile-modal-btn popUpLogOut"
            onClick={handleLogout}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;

