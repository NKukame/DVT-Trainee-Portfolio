import SearchNav from "./SearchNav";
import './SearchResults.css';
import UserCard from "./UserCard";
import Pagination from '@mui/material/Pagination';
import ProjectCard from "./ProjectCard";

export default function SearchResults({results, resultsCopy, filter}) {
  
  return (
    <>
      <section className="results-container">
        <SearchNav filter={filter} results={results} />       
        <ResultsList results={resultsCopy} id={'employee_id'}/>
      </section>
    </>
  )
};

export function ResultsList({results, id}){

  if(results.length == 0){
    return <h1>Results not Found</h1>
  }

  const employees = results.filter((result) => {return result.project_id === undefined});
  const projects = results.filter((result) =>{return result.project_id !== undefined});

  return (
    <>
      <div className="users-list">
        {
          employees.map((user, indes) =>{
            return (<UserCard user={user}  key={indes}/>)
          })
        }
      </div>
      <section className="results-list">
        {
          projects.map((result, index) => {
            return ( 
              <ProjectCard result={result} />
            );})
          }
        <Pagination count={results.length} variant="outlined" color="primary"  className="pagination"/>
      </section>
    </>
  )
}
