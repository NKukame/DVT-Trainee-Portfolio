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

      <div className="flex-row align-items-center">
        <TabButton text={'People'} Icon={PeopleIcon} handleSearchFilter={handleSearchFilter} isPeopleSearch={isPeopleSearch} />
        <TabButton text={'Projects'} Icon={FolderIcon} handleSearchFilter={handleSearchFilter} isPeopleSearch={isPeopleSearch} />
      </div>

      <div>
        <SelectScrollable></SelectScrollable>
      </div>

    </div>
  )
};

function TabButton({text, Icon, handleSearchFilter,isPeopleSearch}){
  
  return (
    <button className={`flex-row align-items-center btn-tab gap-10-px ${!isPeopleSearch ? 'btn-tab-active' : ''}` }
            onClick={() => { handleSearchFilter(true);}}>
            <Icon/> <span>{text}</span> 
    </button>
  )
}

function filterResults(results, isProject, filter){

  if(isProject === true){
    results = results.filter( result =>{return result.project_id !== undefined})
  }
  else if(isProject === false){
    results = results.filter(result => {return result.role !== undefined;})
  }

  filter(results);
}
