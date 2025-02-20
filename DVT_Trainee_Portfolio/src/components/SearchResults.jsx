import { Link } from "react-router-dom"
import SearchNav from "./SearchNav";
import { generatePastelColor } from "../lib/color";
import './SearchResults.css';

export default function SearchResults({results, resultsCopy, filter}) {
  console.log(resultsCopy);
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
  
  return (
    <section className="results-list">
      {
        results.map((result, index) => {
          return (
            <Link to={'/UserPortfolio'} key={result[id]+index} className="result-link">
            <Results result={result} isProject={result.project_id !== undefined} /></Link>
          );})
        }
    </section>
  )
}

export function Results({result, isProject}) {
  
  return (
    <div className="results">
      <div className="r-profile">
        <div className="results-pic">
          <img src={isProject ? result.screenshot: result.avatar} alt=""  className={isProject ? "r-project-pic" : 'r-user-pic'}/>
        </div>
        
        <div className="intro">
          <p className="results-title">{isProject ? result.title: result.name}</p>
          <p className="results-type">{isProject ? result.created_on : result.role}</p>
        </div>
      </div>

      <div className="results-data">
        <p className="results-bio text-container">{isProject ? result.description : result.bio}</p>
      </div>
      <div className="user-skills">
        {
          !isProject ? <GenerateBadges badgeList={result.skills} /> : <GenerateBadges badgeList={result.technologies} />
        }
      </div>
    </div>
  );
}


export function GenerateBadges({badgeList}){
  if(badgeList !== undefined){
    const lessList = badgeList.slice(0, 3); 
    const plusList = badgeList.slice(3);
    return (
      <>
      <ul className="skills-list">
        {
          lessList.map((badge)=>{
            return (<li><p  className="badge" style={{background: generatePastelColor(badge)}}>{badge}</p></li>)
          })
        }
        <li className="badge" style={{background: 'gray'}}>{`${plusList.length}+`}</li>
      </ul>
      </>
    )
  }
  
}