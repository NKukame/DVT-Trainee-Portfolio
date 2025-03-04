import Avatar from '@mui/material/Avatar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tooltip from '@mui/material/Tooltip';
import './UserCard.css'
import { Link } from 'react-router-dom';

export default function UserCard({user}) {
  return (
    <div className="users">
      <div className='user-details'>
        <div>
          <Avatar
            alt={user.name}
            src={''}
            sx={{ width: 75, height: 75 }}
          />
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
      <p>{user.bio}</p>
    </div>
  )
 };
 