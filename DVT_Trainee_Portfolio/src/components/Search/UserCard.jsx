import {Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Badges from '../Badges';

export function UserCard({ user,showDetails = true }) {
  
  return (
    <div className="card-user flex-col gap-10-px shadow">
      <div className='flex-row align-items-center gap-10-px'>
        <Avatar alt={user.name} src={user.avatar || ''} sx={{ width: 52, height: 52 }} />
        <div>
          <p className='font-size-20-px text-black'>{user.name}</p>
          <p className='font-size-12-px font-waight-400'>{user.role}</p>
        </div>
      </div>
      {showDetails && <UserDetails user={user} />}
      <Link className="text-color-white font-size-14-px link-style border-radius-4-px py-4-px" to={'/userportfolio'}>View Profile</Link>
    </div>
  );
}


function UserDetails({ user }) {
  return (
    <>
      <div className="flex-row align-items-center gap-10-px">
        <InfoItem icon="./Icon.png" text={user.location} />
        <InfoItem icon="/Award-01.png" text={`${user.years_active} Years`} />
      </div>
      <div className='skills-list'>
        <Badges badgeList={user.skills} />
      </div>
    </>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="flex-row align-items-center gap-10-px">
      <img src={icon} alt="" />
      <p className="text-gray font-size-12-px whitespace-nowrap">{text}</p>
    </div>
  );
}