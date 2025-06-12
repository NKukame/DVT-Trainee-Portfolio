import Badges from '../BadgeComp/Badges';
import { Link } from 'react-router-dom';
import { LinkExternal01, XClose } from '@untitled-ui/icons-react';
import { useState } from 'react';


export default function ProjectCard({ result, showAuthor = false, showTech = true}) {

  const [open, setOpen] = useState(false);

  return (
    <div className="card-project shadow flex-col gap-10-px">
      <div>
        <p className="font-size-20-px">{result.name}</p>
        <p className="font-size-12-px text-gray">{result.created_on}</p>
      </div>

      <div>
        <p className="font-size-14-px">{result.description}</p>
      </div>

      {/* {showTech && (<Badges badgeList={result.technologies} />  )} */}

      {showAuthor && <Link className="text-underline-link">@John</Link>}

      <button  className='text-color-white link-style border-radius-4-px py-4-px project-btn' onClick={()=> setOpen(true)}>
        View project
      </button>

      {open && <ProjectModal setOpen={setOpen} project={result} />}
    </div>
  );
}


function ProjectModal({setOpen, project}){

  return (
    <div className='modal-overlay shadow'  onClick={()=>setOpen(false)}>
      <div className='modal-content project-modal-width shadow'>
        <div className='flex-row align-items-center '>
          <p className='flex-1 project-modal-title'>{project.name}</p>
          <div className='flex-row gap-10-px align-items-center'>
            <img src={project.avatar} alt="" className='project-avatar'  />
            <p className='username-capitalize'>{project.username}</p>
          </div>
          <XClose onClick={()=>setOpen(false)} className='close-modal' />
        
        </div>

        <div>
          <img src={`./${project.screenshot}` } className='w-full'
          alt="" />
        </div>
        <div>
          <p className='project-badge-heading'>Project Description</p>
          <p>{project.description}</p>
        </div>

        <div className='flex-col separator-padding'>
          <div className='separator'></div>
        </div>

        <ProjectBadges list={project.industries} badgeHeading={'Industries'} />
        <div className='flex-col separator-padding'>
          <div className='separator'></div>
        </div>
        <ProjectBadges list={project.technologies} badgeHeading={'Tech Stack'} />
        <div className='flex-col separator-padding'>
          <div className='separator'></div>
        </div>

        <div className='flex-row gap-24-px m-top'>
          <Link className='btn-project repo-btn'> <LinkExternal01 fontSize={15}/> <span>Repo</span> </Link>
          <Link className='btn-project demo-btn'> <LinkExternal01 fontSize={15}/> <span>Demo</span></Link>
          
        </div>
      </div>
    </div>
  )
}

function ProjectBadges({list, badgeHeading}){

  return (
    <div>
      <p className='project-badge-heading'>{badgeHeading}</p>
      <Badges badgeList={list} sliceList={false} />
    </div>
  )
}