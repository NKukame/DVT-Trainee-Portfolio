import  { SelectScrollable } from './Sort';
import PeopleIcon from '@mui/icons-material/People';
import { FolderIcon } from 'lucide-react';
export default function SearchNav({filter, results, setCurrentSearch,currentSearch}) {

  return (
    
    <div className="flex-row-between">
      <div className="result-nav-btns">
        <div className="nav-group">
          <button className={`flex-row-center btn-tab ${currentSearch ? 'btn-tab-active' : ''}`}
            onClick={(e)=>{
              toggleNav(e, results, false, filter);
              setCurrentSearch(true)
              }}>
              <PeopleIcon/> <span>People</span></button>
          <button className={`flex-row-center btn-tab ${!currentSearch ? 'btn-tab-active' : ''}` }
            onClick={(e)=>{
              toggleNav(e, results, true, filter);
              setCurrentSearch(false)
              }}>
                <FolderIcon/> <span>Projects</span> 
                </button>
        </div>
      </div>
      <div className='sort-btn-container'>
        <div>
          <SelectScrollable></SelectScrollable>
        </div>
      </div>
    </div>
  )
};

function filterResults(results, isProject, filter){

  if(isProject === true){
    results = results.filter( result =>{return result.project_id !== undefined})
  }
  else if(isProject === false){
    results = results.filter(result => {return result.role !== undefined;})
  }

  filter(results);
}

function toggleNav(e, results, isProject, filter ){

  const buttons = e.currentTarget.closest('div').children;

  for(let i = 0;  i < buttons.length; i++){
    if(e.target === buttons[i]){
      buttons[i].classList.add('btn-list');
    }else{
        buttons[i].classList.remove('btn-list')
    }
  }
  filterResults(results, isProject, filter);
}