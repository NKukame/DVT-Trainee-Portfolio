import  { SelectScrollable } from '../SortComp/Sort';
import { Folder, Users01 } from '@untitled-ui/icons-react';

export default function SearchNav({filter, results,isPeopleSearch,setSearch}) {

   const handleSearchFilter = () =>{
    filterResults(results, isPeopleSearch, filter);
    setSearch(!isPeopleSearch);
  }

  return (
    
    <div className="flex-row flex-row-between align-items-center flex-wrap">

      <div className="flex-row align-items-center">
        <TabButton text={'People'} Icon={Users01} handleSearchFilter={handleSearchFilter} isPeopleSearch={!isPeopleSearch} />
        <TabButton text={'Projects'} Icon={Folder} handleSearchFilter={handleSearchFilter} isPeopleSearch={isPeopleSearch} />
      </div>

      <div>
        <SelectScrollable filter={filter} results={results} />
      </div>

    </div>
  )
};

function TabButton({text, Icon, handleSearchFilter,isPeopleSearch}){
  
  return (
    <button className={`flex-row align-items-center font-size-20-px btn-tab gap-10-px font-weight-400 text-gray ${!isPeopleSearch ? 'btn-tab-active border-radius-10-px text-black' : ''}` }
      onClick={handleSearchFilter}>
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