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
    <>
      <section className="results-container">
        <SearchNav filter={setCopy} results={filteredResults} />       
        <ResultsList results={displayedItems} id={'employee_id'}/>

        <Box sx={{display:'flex', justifyContent:'center', margin:'2em'}}>
          <Pagination 
          count={Math.ceil(resultsCopy.length / itemsPerPage)} 
          page={currentPage} onChange={handleChangePage}
           sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
              borderColor: 'white',
            },
            '& .Mui-selected': {
              backgroundColor: '#2B5876',
              color: 'white',
              borderColor: 'white',
            },
            '& .MuiPaginationItem-ellipsis': {
              color: 'white',
            },
            '& .MuiPaginationItem-icon': {
              color: 'yellow',
            },
          }}
          />

        </Box>
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
