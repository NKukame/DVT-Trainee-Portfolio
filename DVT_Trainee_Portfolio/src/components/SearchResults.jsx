import { Link } from "react-router-dom"
import SearchNav from "./SearchNav";
import Avatar from '@mui/material/Avatar';
import './SearchResults.css';
import UserCard from "./UserCard";
import Pagination from '@mui/material/Pagination';

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
              <Results result={result}/>
            );})
          }
        <Pagination count={results.length} variant="outlined" color="primary"  className="pagination"/>
      </section>
    </>
  )
}

export function Results({result}) {

  return (
    <div className="results">
      <div className="card-text">
        <div className="intro">
          <p className="results-title">{result.title}</p>
          <p className="results-type">{result.created_on}</p>
        </div>

        <div className="results-data">
          <div className="results-p">
            <p className="results-bio text-container">{result.description}</p>
          </div>
        </div>
        <div className="user-skills">
          {
            <GenerateBadges badgeList={result.technologies} />
          }
        </div>
        <div className="card-footer">
          <div className="user-profile">
            <div className="users-pic">
              <Avatar src="/Gomo.jpg" />
            </div>
            <Link className="user-name">@Thabane</Link>
          </div>
          <Link to={'/userportfolio'}>
            <button className="port-btn">View project</button>
          </Link>
        </div>
      </div>
      </div> 
  );
}


export function GenerateBadges({badgeList}){
  if(badgeList !== undefined){
    return (
      <>
      <ul className="skills-list">
        {
          badgeList.map((badge)=>{
            return (<li><p  className="badge">{badge}</p></li>)
          })
        }
      </ul>
      </>
    )
  }
  
}