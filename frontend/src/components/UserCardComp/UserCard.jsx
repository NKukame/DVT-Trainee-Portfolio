import {Avatar, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Badges from '../BadgeComp/Badges';
import { Award02 , GitBranch01, Mail01, MarkerPin01 } from "@untitled-ui/icons-react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import { useState } from "react";
import github from '../../assets/Github.png';
import slack from '../../assets/Slack.png';
import linkedIn from '../../assets/Linkedin.png';
import email from '../../assets/email-Icon.png';
import { useNavigate } from "react-router-dom";
import UserPortfolio from "../../Pages/UserPortfolioPage/UserPortfolio";
export function UserCard({  user,showDetails = true }) {
  const [open, setOpen] = useState(false);
 
  return (
    <div className="card-user flex-col gap-16-px shadow flex-row-between">
      <div className="flex-row">
        <div className='flex-row align-items-center gap-10-px flex-1'>
          <Avatar alt={user.name} src={user.avatar || ''} sx={{ width: 52, height: 52 }} />
          <div>
            <p className='font-size-20-px text-black'>{user.name }</p>
            <p className='font-size-12-px font-waight-400'>{user.role}</p>
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
            <Mail01 onClick={()=> setOpen((isOpen)=> !isOpen)}/>
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
            {user.location}
          </p>
        </div>
        <div className="flex-row align-items-center gap-4-px">
          <Award02 strokeWidth={"90px"} width={13} height={17} />
          <p className="text-gray font-size-12-px whitespace-nowrap">{`${user.years_active}`}</p>
        </div>
        <div className="flex-row align-items-center gap-10-px">
          <span
            className={`availability ${
              user.availability === 'Available' ? "available" : "with-client"
            }`}
          ></span>
          <p className="font-size-12-px text-gray">
            {user.availability === 'Available' ? "Available" : "On Client"}
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
