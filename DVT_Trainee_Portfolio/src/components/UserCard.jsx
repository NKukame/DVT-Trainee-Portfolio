import Avatar from '@mui/material/Avatar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tooltip from '@mui/material/Tooltip';
import './UserCard.css'
import { Link } from 'react-router-dom';
import Badges from './Badges';
import Badge from '@mui/material/Badge';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function UserCard({user}) {

  return (
    <div className="users">
      <div className='user-details'>
        <div>
          <Badge color="secondary" overlap="circular" variant='dot' badgeContent=" ">
          <Avatar
            alt={user.name}
            src={''}
            sx={{ width: 50, height: 50 }}
          />
          </Badge>
        </div>
        <div className="user-text">
          <p className='username'>{user.name}</p>
          <p className='role'> {user.role}</p>
        </div>
        <div className='user-portfolio-link'>
          <Tooltip title="View portfolio"  placement='top' arrow>
            <Link to={'/userportfolio'} className='user-link'>
              <OpenInNewIcon   />
            </Link>
          </Tooltip>

        </div>
      </div>
      <ViewMore user={user}  />
  
    </div>
  )
 };

 
function ViewMore({user}){
  return (
    <>
      <div className="div users-data">
        <div className="user-more-data">
          <img src="./Icon.png" alt="" />
          <p>{user.location}</p>

        </div>
        <div className=" user-more-data">

          <img src="/Award-01.png" alt="" />
          <p>{user.years_active}</p>
        </div>
      </div>
      <div className='badge-list'>
        <Badges badgeList={user.skills} />
      </div>
    </>
  )
}