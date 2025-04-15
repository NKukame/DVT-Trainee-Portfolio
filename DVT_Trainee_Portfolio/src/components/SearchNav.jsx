import  { SelectScrollable } from './Sort';
import PeopleIcon from '@mui/icons-material/People';
import { FolderIcon } from 'lucide-react';

export default function SearchNav({filter, results,isPeopleSearch,setSearch}) {

  const handleSearchFilter = (isPeople) =>{
    filterResults(results, isPeople, filter);
    setSearch(!isPeople);
  }

  return (
    
    <div className="flex-row flex-row-between align-items-center flex-wrap">
      <div>
        <div className="flex-row align-items-center">
          <button className={`flex-row align-items-center btn-tab ${isPeopleSearch ? 'btn-tab-active' : ''}`}
            onClick={() => { handleSearchFilter(false);}}>
              <PeopleIcon/> <span>People</span>
              </button>

          <button className={`flex-row align-items-center btn-tab ${!isPeopleSearch ? 'btn-tab-active' : ''}` }
            onClick={() => { handleSearchFilter(true);}}>
            <FolderIcon/> <span>Projects</span> 
            </button>
            
        </div>
      </div>
      <div>
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
