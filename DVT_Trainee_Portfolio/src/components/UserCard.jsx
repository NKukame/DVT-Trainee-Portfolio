import Avatar from '@mui/material/Avatar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tooltip from '@mui/material/Tooltip';
import './UserCard.css'
import { Link } from 'react-router-dom';
import Badges from './Badges';
import Badge from '@mui/material/Badge';

export default function UserCard({user}) {
  return (
    <div className="users">
      <div className='user-details'>
        <div>
          <Badge color="secondary" overlap="circular" badgeContent=" ">
          <Avatar
            alt={user.name}
            src={''}
            sx={{ width: 75, height: 75 }}
          />
      </Badge>
        </div>
        <div className="user-text">
          <p className='username'>{user.name}</p>
          <p className='role'> {user.role}</p>
        </div>
        <div className='user-portfolio-link'>
          <Tooltip title="View portfolio" placement='top' arrow>
            <Link to={'/userportfolio'} className='user-link'>
              <OpenInNewIcon />
            </Link>
          </Tooltip>
        </div>
      </div>
      <div className="div users-data">
        <div className=" user-more-data">
          <p className='text-p'>Experience</p>
          <p>9 years</p>
        </div>
        <div className="user-more-data location">
          <p className='text-p'>Location</p>
          <p>Lorem, ipsum.</p>
        </div>
        <div className="user-more-data">
          <p className='text-p'>Projects</p>
          <p>5</p>
        </div>
      </div>
      <div>
        <Badges badgeList={user.skills} />
      </div>
    </div>
  )
 };
 