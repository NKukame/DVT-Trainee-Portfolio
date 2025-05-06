
import SearchNav from "./SearchNav";
import { useSearch } from "../contexts/SearchContext";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import PaginationControls from './PaginationControls';
import ResultsList from './ResultsList';

import './SearchPage.css';

export default function SearchResults() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isProject = queryParams.get("isProject") === "true";
  const [curentProject, setCurrentProject] = useState(isProject);
  const [,,, filteredResults] = useSearch();
  const [resultsCopy, setCopy] = useState(filteredResults);
  const [currentSearch, setCurrentSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentProject(isProject);
    setCurrentSearch(!isProject); // Toggle currentSearch based on isProject
  }, [isProject]);

useEffect(() => {
  console.log("isProject:", isProject);
  console.log("Filtered Results:", filteredResults);

  const finalResults = currentSearch
    ? filteredResults.filter((result) => !result.project_id) // Non-project results
    : filteredResults.filter((result) => result.project_id); // Project results

  console.log("Final Results:", finalResults);

  setCopy(finalResults);
  setCurrentPage(1); // Reset to the first page on new search
  setCurrentSearch(!isProject); // Toggle currentSearch based on isProject
}, [filteredResults, currentSearch]);

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
        results={filteredResults} 
        setSearch={setCurrentSearch} 
        isPeopleSearch={currentSearch} 
      />

      <section className="flex-1 results-container">
          <ResultsList results={displayedItems} isEmployeeSearch={currentSearch} />
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
