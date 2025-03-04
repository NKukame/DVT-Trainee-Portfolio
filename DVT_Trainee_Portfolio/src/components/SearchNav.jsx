import sort from '../assets/icons8-sort-100 (1).png'
import SwapVertIcon from '@mui/icons-material/SwapVert';

export default function SearchNav({filter, results}) {
  return (
    <div className="result-nav">
      <div className="result-nav-btns">
        <div className="nav-btns">
          <button className="result-nav-btn" 
            onClick={()=>{filterResults(results, undefined, filter)}} autoFocus>All</button>
          <button className="result-nav-btn" 
            onClick={()=>{filterResults(results, false, filter)}}>Employees</button>
          <button className="result-nav-btn" 
            onClick={()=>{filterResults(results, true, filter)}}>Projects</button>
        </div>
      </div>
      <div className='sort-btn-container'>
        <div>
          <button className="result-nav-btn sort-btn">
            <span className="sort-txt">Sort</span>
            <SwapVertIcon/>
          </button>
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