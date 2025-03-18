import { Box, Container } from "@mui/material";
import SearchNav from "./SearchNav";
import './SearchResults.css';
import UserCard from "./UserCard";
import Pagination from '@mui/material/Pagination';
import ProjectCard from "./ProjectCard";
import { useSearch } from "../contexts/SearchContext";
import {useEffect, useState} from 'react';

export default function SearchResults() {
  
  const [,,,filteredResults] = useSearch();
  const [resultsCopy, setCopy] = useState(filteredResults);
  useEffect(()=>{ setCopy(filteredResults);}, [filteredResults]);

  return (
    <>
      <section className="results-container">
        <SearchNav filter={setCopy} results={filteredResults} />       
        <ResultsList results={resultsCopy} id={'employee_id'}/>
      </section>
    </>
  )
};

export function ResultsList({results, id}){

  if(results.length == 0){
    return <h1 className="no-results-title">Results not Found</h1>
  }

  const employees = results.filter((result) => {return result.project_id === undefined});
  const projects = results.filter((result) =>{return result.project_id !== undefined});

  return (
    <>
      <Container className="users-list" >
        {
          employees.map((user, indes) =>{
            return (<UserCard user={user}  key={indes}/>)
          })
        }
      </Container>
      <Container className="project-list">
        {
          projects.map((result, index) => {
            return ( 
              <ProjectCard result={result} />
            );})
          }
      </Container>
    </>
  )
}
