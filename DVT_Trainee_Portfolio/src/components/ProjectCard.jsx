import Badges from './Badges';
import { Link } from 'react-router-dom';

export default function ProjectCard({ result, showAuthor = false, showTech = true, showButton = true }) {
  
  return (
    <div className="card-project shadow flex-col gap-10-px">
      <div>
        <p className="font-size-20-px">{result.name}</p>
        <p className="font-size-12-px text-gray">{result.created_on}</p>
      </div>

      <div>
        <p className="font-size-14-px">{result.description}</p>
      </div>

      {showTech && (<Badges badgeList={result.technologies} />  )}

      {showAuthor && <Link className="text-underline-link">@John</Link>}

      <div className="link-style border-radius-4-px py-4-px ">
        {showButton && (
          <Link to={'/userportfolio'} className='text-color-white'>
            View project
          </Link>
        )}
      </div>

    </div>
  );
}
