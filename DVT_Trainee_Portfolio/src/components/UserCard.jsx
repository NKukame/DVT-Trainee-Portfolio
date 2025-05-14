import {Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Badges from './Badges';
import { Award02, MarkerPin01 } from "@untitled-ui/icons-react";

export function UserCard({ user,showDetails = true }) {
  console.log(user)
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
        <div className="flex-row align-items-center gap-4-px">
          <MarkerPin01 width={13} height={17}/>
          <p className="text-gray font-size-12-px whitespace-nowrap">{user.location}</p>
        </div>
        <div className="flex-row align-items-center gap-4-px">
          <Award02 strokeWidth={"90px"} width={13} height={17}/>
          <p className="text-gray font-size-12-px whitespace-nowrap">{`${user.years_active} Years`}</p>
        </div>
      </div>
      <div className='skills-list'>
        <Badges badgeList={user.skills} />
      </div>
    </>
  );
}
