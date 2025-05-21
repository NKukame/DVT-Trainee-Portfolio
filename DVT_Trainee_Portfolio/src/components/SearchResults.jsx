
import SearchNav from "./SearchNav";
import { useSearch } from "../contexts/SearchContext";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import PaginationControls from './PaginationControls';
import ResultsList from './ResultsList';

import './SearchPage.css';

export default function SearchResults() {

  const location = useLocation();
  const [,,, filteredResults] = useSearch();
  const queryParams = new URLSearchParams(location.search);
  const isProject = queryParams.get("isProject") === "true";
  const [curentProject, setCurrentProject] = useState(!isProject);
  const [resultsCopy, setCopy] = useState([]);
  // const [isPeopleSearch, setCurrentSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    
    const results =  curentProject ? filteredResults.filter((result)=> !result.project_id) 
                    : filteredResults.filter((result)=> result.project_id);

    setCopy(results);
    setCurrentPage(1);
    // setCurrentProject((prev) => prev); // Toggle currentProject based on isProject
    // setCurrentSearch(!isProject); // Toggle currentSearch based on isProject
  }, [filteredResults, curentProject]);
    

  const displayedItems = resultsCopy.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <article className="flex-col">
      <SearchNav 
        filter={setCopy} 
        results={resultsCopy} 
        setSearch={setCurrentProject} 
        isPeopleSearch={curentProject} 
      />

      <section className="flex-1 results-container">
          <ResultsList results={displayedItems} isEmployeeSearch={curentProject} />
      </section>
        <PaginationControls
          totalItems={resultsCopy.length} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          onPageChange={handleChangePage} 
        />
    </article>
  );
}
