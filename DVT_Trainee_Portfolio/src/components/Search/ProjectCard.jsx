import Badges from '../Badges';
import { Link } from 'react-router-dom';

export default function ProjectCard({ result, showAuthor = true, showTech = true, showButton = true }) {
  return (
    <div className="card-project">
      <div className="flex-col-start">
        <div>
          <p className="text-title-lg">{result.name}</p>
          <p className="text-type-muted">{result.created_on}</p>
        </div>

        <div>
          <p className="text-container">{result.description}</p>
        </div>

        {showTech && (
          <div className="skills-list">
            <Badges badgeList={result.technologies} />
          </div>
        )}

        <div className="flex-row-between">
          {showAuthor && <Link className="text-underline-link">@John</Link>}
          {showButton && (
            <Link to={'/userportfolio'}>
              <button className="btn-view">View project</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
