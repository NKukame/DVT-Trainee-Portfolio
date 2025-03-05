import Badges from "./Badges";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import './ProjectCard.css'
import Button from '@mui/material/Button';

export default function ProjectCard({result}) {
  
  return (
    <div className="results">
      <div className="card-text">
        <div className="intro">
          <p className="results-title">{result.title}</p>
          <p className="results-type">{result.created_on}</p>
        </div>

        <div className="results-data">
          <div className="results-p">
            <p className="results-bio text-container">{result.description}</p>
          </div>
        </div>
        <div className="user-skills">
          {
            <Badges badgeList={result.technologies} />
          }
        </div>
        <div className="card-footer">
          <div className="user-profile">
            <div className="users-pic">
              <Avatar src="/Gomo.jpg" />
            </div>
            <Link className="user-name">@Thabane</Link>
          </div>
          <Link to={'/userportfolio'}>
            <Button variant='outlined' size="small">View project</Button>
          </Link>
        </div>
      </div>
      </div> 
  );
};
