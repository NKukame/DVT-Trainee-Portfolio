import Sort from './Sort';

export default function SearchNav({filter, results}) {

  return (
    
    <div className="result-nav">
      <div className="result-nav-btns">
        <div className="nav-btns">
          <button className="result-nav-btn btn-list" 
            onClick={(e)=>{
              toggleNav(e, results, undefined, filter);}}>All</button>
          <button className="result-nav-btn" 
            onClick={(e)=>{toggleNav(e, results, false, filter);}}>
              Employees</button>
          <button className="result-nav-btn" 
            onClick={(e)=>{
              toggleNav(e, results, true, filter);}}>Projects</button>
        </div>
      </div>
      <div className='sort-btn-container'>
        <div>
          <Sort></Sort>
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