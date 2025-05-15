import { useState } from 'react';
import Badges, { Badge } from './Badges';
import { Link } from 'react-router-dom';
import { LinkExternal01 } from '@untitled-ui/icons-react';

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

      <button className="link-style border-radius-4-px py-4-px project-btn " onClick={()=> setOpen(true)}>
       View Project
      </button>

      {
       open && 
       <div className='modal-overlay' onClick={()=>setOpen(false)}> 
          <div className='modal-content project-modal-width rounded shadow'>
            <button className='modal-close project-close-btn' onClick={()=> setOpen(false)}>X</button>

            <div className='modal-title-project'> 
              <h1 className='font-size-20-px'>{result.name}</h1>
              <div>
                <div className='flex-row gap-4-px align-items-center test'>
                  <img src={result.avatar} alt="" className='profile-image' /> 
                  <p className='font-size-14-px capitalize'>{result.username}</p>
                </div>

              </div>
            </div>

            <div className='image-div'>
              <img src={`./${result.screenshot}` }
              className='modal-project-image rounded'
              alt="" />
            </div>
            <div className='m-bottom-10-px'>
              <h2 className='m-bottom-10-px'>Project Description</h2>
              <p>{result.description}</p>
            </div>
            <div className='h-1 w-full bg-gray m-bottom-20-px'></div>
            <div className='m-bottom-10-px'>
              <h2 className='m-10-px m-bottom-10-px'>Industries</h2>
              <Badges badgeList={result.industries} />
            </div>

            <div className='h-1 w-full bg-gray m-bottom-20-px'></div>
            <div className='m-bottom-10-px'>
              <h2 className='m-10-px m-bottom-10-px'>Tech Stack</h2>
              <Badges badgeList={result.technologies} sliceList={false}/>
            </div>
            <div className='h-1 w-full bg-gray m-bottom-20-px'></div>
            <div className='flex-row flex-row-between m-top-10-px'>
              <Link to={''} className='repo-btn flex-row align-items-center gap-10-px '> <LinkExternal01/> <span>Repo</span></Link>
              <Link to={''} className='project-btn demo-btn flex-row align-items-center gap-10-px'> <LinkExternal01/> <span>Demo</span> </Link >
            </div>
          </div>
       </div> 
      }

    </div>
  );
}
