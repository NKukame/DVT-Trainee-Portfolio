import {Avatar, Tooltip } from "@mui/material";
import { Link } from "react-router";
import Badges from '../BadgeComp/Badges';
import { Award02 , GitBranch01, Mail01, MarkerPin01 } from "@untitled-ui/icons-react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import { useState, useEffect } from "react";
import axios from "axios";
import github from '../../assets/Github.png';
import slack from '../../assets/Slack.png';
import linkedIn from '../../assets/Linkedin.png';
import email from '../../assets/email-Icon.png';
import { useNavigate } from "react-router";
import UserPortfolio from "../../Pages/UserPortfolioPage/UserPortfolio";
export function UserCard({  user, showDetails = true, isBookmarked = false, onBookmarkToggle }) {
  const [open, setOpen] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // Early return if user is not properly defined
  if (!user || !user.name) {
    console.warn('UserCard received invalid user data:', user);
    return (
      <div className="card-user flex-col gap-16-px shadow flex-row-between">
        <div className="flex-row">
          <div className='flex-row align-items-center gap-10-px flex-1'>
            <Avatar sx={{ width: 52, height: 52 }} />
            <div>
              <p className='font-size-20-px text-black'>Unknown User</p>
              <p className='font-size-12-px font-waight-400'>No role specified</p>
            </div>
          </div>
        </div>
        <p className="text-gray font-size-12-px">Invalid user data</p>
      </div>
    );
  }

  const addBookmark = async () => {
    const userId = user.id || user.employee_id || user.employeeId;
    if (!userId) {
      console.error("No user ID found", user);
      return;
    }
    
    setBookmarkLoading(true);
    
    // Get current user ID - handle different storage formats
    let currentUserId;
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (typeof storedUser === 'string') {
        // If it's just a string, it's the user ID
        currentUserId = storedUser;
      } else if (storedUser?.user?.id) {
        // If it's an object with nested user
        currentUserId = storedUser.user.id;
      } else if (storedUser?.id) {
        // If it's an object with direct id
        currentUserId = storedUser.id;
      }
    } catch (error) {
      // If JSON.parse fails, try getting it directly as string
      currentUserId = localStorage.getItem("user");
    }
    
    console.log("Current user ID:", currentUserId);
    
    if (!currentUserId) {
      alert("User not found. Please log in again.");
      setBookmarkLoading(false);
      return;
    }
    
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      
      const response = await axios.post(
        "http://localhost:3000/bookmarks/toggle",
        {
          employeeId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      console.log("Bookmark response:", response.data);
      alert(response.data.message || "Profile bookmarked successfully!");
      if (onBookmarkToggle) onBookmarkToggle();
    } catch (error) {
      console.error("Error adding bookmark:", error);
      console.error("Full error:", error.response);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Request payload was:", {
        employeeId: userId
      });
      console.error("User ID:", userId);
      
      // Show the actual error message with better extraction
      const errorData = error.response?.data;
      let errorMsg = 'Unknown error';
      
      if (typeof errorData === 'string') {
        errorMsg = errorData;
      } else if (errorData?.message) {
        errorMsg = errorData.message;
      } else if (errorData?.error) {
        errorMsg = errorData.error;
      } else if (errorData) {
        // Try to extract meaningful info from the error object
        errorMsg = JSON.stringify(errorData, null, 2);
      } else {
        errorMsg = error.message;
      }
      
      console.error("Extracted error message:", errorMsg);
      
      if (error.response?.status === 409 || (typeof errorMsg === 'string' && errorMsg.includes('unique'))) {
        alert("Profile is already bookmarked!");
      } else {
        alert(`Failed to bookmark profile: ${errorMsg}`);
      }
    } finally {
      setBookmarkLoading(false);
    }
  };
 
  return (
    <div className="card-user flex-col gap-16-px shadow flex-row-between">
      <div className="flex-row">
        <div className='flex-row align-items-center gap-10-px flex-1'>
          <Avatar alt={user.name} src={user.avatar || ''} sx={{ width: 52, height: 52 }} />
          <div style={{maxWidth: '200px'}}>
            <p className='font-size-20-px text-black whitespace-nowrap'>{user.name || 'Unknown User'}</p>
            <p className='font-size-12-px font-waight-400'>{user.role || 'No role specified'}</p>
          </div>
        </div>
          <div className="socials-container">
            {
              open &&
              <div className="socials-section shadow">
                {
                  user.github &&
                  <Link to={user.github}>
                    <img src={github} alt="github" />
                  </Link>
                }
                {
                  user.linkedin &&
                  <Link to={user.linkedin}>
                    <img src={linkedIn} alt="LinkedIn" />
                  </Link>
                }
                {
                  user.email &&
                  <Link to={user.email}>
                    <img src={email} alt="email" />
                  </Link>
                }
                {
                  user.slack &&
                  <Link to={user.social_links.slack}>
                    <img src={slack} alt="slack" />
                  </Link>
                }
              </div>
            }
            <div className="card-actions">
              <Mail01 onClick={()=> setOpen((isOpen)=> !isOpen)}/>
              <button
                className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={addBookmark}
                disabled={bookmarkLoading}
                title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {bookmarkLoading ? (
                  <div className="bookmark-loader"></div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
      </div>
      {showDetails && <UserDetails user={user} />}
      <Link className="text-color-white font-size-14-px link-style border-radius-4-px py-4-px" to={'/userportfolio'} state={user}>View Profile</Link>
    </div>
  );
}


function UserDetails({ user }) {
  return (
    <>
      <div className="flex-row align-items-center gap-24-px ">
        <div className="flex-row align-items-center gap-4-px">
          <MarkerPin01 width={13} height={17} />
          <p className="text-gray font-size-12-px whitespace-nowrap">
            {user.location || 'Location not specified'}
          </p>
        </div>
        <div className="flex-row align-items-center gap-4-px">
          <Award02 strokeWidth={"90px"} width={13} height={17} />
          <p className="text-gray font-size-12-px whitespace-nowrap">{user.years_active || 'N/A'}</p>
        </div>
        <div className="flex-row align-items-center gap-10-px">
          <span
            className={`availability ${
              user.availability  ? "available" : "with-client"
            }`}
          ></span>
          <p className="font-size-12-px text-gray">
            {user.availability  ? "Available" : "On Client"}
          </p>
        </div>
      </div>
      <div className="skills-list">
        {user.techStack && user.techStack.length > 0 ? (
          <Badges
            badgeList={user.techStack.map((tech) => tech.techStack.name)}
          />
        ) : (
          <a href="/profile-creation" className="add-skills-button ">
            <p className="badge-default line-clamp-1 width">+ Add Skills</p>
          </a>
        )}
      </div>
    </>
  );
}
