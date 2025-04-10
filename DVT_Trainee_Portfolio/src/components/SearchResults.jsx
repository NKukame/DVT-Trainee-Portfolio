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
  const [currentSearch, setCurrentSearch] = useState(true);
  useEffect(()=>{ setCopy(filteredResults);}, [filteredResults]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const displayedItems = [...resultsCopy].slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <article className="results-body">
      <SearchNav filter={setCopy} results={filteredResults}  setCurrentSearch={setCurrentSearch} currentSearch={currentSearch}/>       
      <section className="results-container">
        <ResultsList results={displayedItems} id={'employee_id'} currentSearchPeaople={currentSearch}/>
          <Box sx={{display:'flex', justifyContent:'center', justifySelf:'flex-end', margin:'1em'}}>
          <Pagination 
          count={Math.ceil(resultsCopy.length / itemsPerPage)} 
          page={currentPage} onChange={handleChangePage}
           sx={{
            '& .MuiPaginationItem-root': {
              color: 'black',
              borderColor: 'white',
            },
            '& .Mui-selected': {
              backgroundColor: '#2B5876',
              color: 'black',
              borderColor: 'white',
            },
            '& .MuiPaginationItem-ellipsis': {
              color: 'black',
            },
            '& .MuiPaginationItem-icon': {
              color: '#2B5876',
            },
          }}
          />

        </Box>
      </section>
    </article>
  )
};

export function ResultsList({results, id, currentSearchPeaople}){

  if(results.length == 0){
    return <h1 className="no-results-title">Results not Found</h1>
  }

  const employees = results.filter((result) => {return result.project_id === undefined});
  const projects = results.filter((result) =>{return result.project_id !== undefined});

  return (
    <>
      {
        currentSearchPeaople &&
      <Container className="users-list" >
        {
          employees.map((user, indes) =>{
            return (<UserCard user={user}  key={indes}/>)
          })
        }
      </Container>
      }
      {
        !currentSearchPeaople &&
          <Container className="project-list">
            {
              projects.map((result, index) => {
                return ( 
                  <ProjectCard result={result} />
                );})
              }
          </Container>
      }
    </>
  )
}
