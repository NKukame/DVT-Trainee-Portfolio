import {Avatar } from "@mui/material";
import UserDetails from './UserDetails'
import { Link } from "react-router-dom";

export function UserCard({ user, showPortfolioLink = true, showDetails = true }) {
  return (
    <div className="card-user flex-col-start">
      <div className='flex-row-center'>
        <Avatar alt={user.name} src={user.avatar || ''} sx={{ width: 52, height: 52 }} />
        <div className="flex-col-fill">
          <p className='text-lg-bold'>{user.name}</p>
          <p className='text-md-muted'>{user.role}</p>
        </div>
      </div>
      {showDetails && <UserDetails user={user} />}
      <Link className="text-link" to={'/userportfolio'}>View Profile</Link>
    </div>
  );
}
