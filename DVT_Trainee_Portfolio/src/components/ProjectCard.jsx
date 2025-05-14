import { useState } from 'react';
import Badges, { Badge } from './Badges';
import { Link } from 'react-router-dom';

export default function ProjectCard({ result, showAuthor = false, showTech = true, showButton = true }) {
  const [open, setOpen] = useState(false)
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
          <button to={'/userportfolio'} className='text-color-white' onClick={()=> setOpen(true)}>
            View project
          </button>
        )}
      </div>

      {
       open && 
       <div className='modal-overlay'> 
          <div className='modal-content flex-col gap-10-px project-modal-width gap-10-px rounded shadow'>
            <button className='modal-close' onClick={()=> setOpen(false)}>X</button>

            <div className='flex-row align-items-center flex-row-between'> 
              <div>
                <h1 className='font-size-20-px'>{result.name}</h1>
              </div>
              <div className='flex-row gap-4-px'>
                <div>
                  <img src={result.avatar} alt="" className='profile-image' />
                </div>
                <p className='font-size-14-px'>{result.username}</p>
              </div>
            </div>

            <div>
              <img src={`./${result.screenshot}` }
              className='modal-project-image rounded'
              alt="" />
            </div>
            <div>
              <h2 className='m-10px'>Project Description</h2>
              <p>{result.description}</p>
            </div>
            <div className='h-1 w-full bg-gray'></div>
            <div>
              <h2 className='m-10-px'>Industries</h2>
              <Badge badge={result.platform} />
            </div>

            <div className='h-1 w-full bg-gray'></div>
            <div>
              <h2 className='m-10-px'>Tech Stack</h2>
              <Badges badgeList={result.technologies} sliceList={false}/>
            </div>
            <div className='h-1 w-full bg-gray'></div>
            <div className='flex-row flex-row-between'>
              <button className='project-btn'>Repo</button>
              <button className='project-btn'>Demo</button>
            </div>
          </div>
       </div> 
      }

    </div>
  );
}
