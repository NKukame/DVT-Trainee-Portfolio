
import SearchNav from "./SearchNav";
import { useSearch } from "../contexts/SearchContext";
import { useEffect, useState } from 'react';
import PaginationControls from './PaginationControls';
import ResultsList from './ResultsList';

import './SearchPage.css';

export default function SearchResults() {

  const [,,, filteredResults] = useSearch();
  const [resultsCopy, setCopy] = useState(filteredResults);
  const [currentSearch, setCurrentSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const finalResults = currentSearch ? resultsCopy.filter(result => !result.project_id)
      : resultsCopy.filter(result => result.project_id);
      
    setCopy(finalResults);
    setCurrentPage(1); // reset page on new search
  }, [filteredResults]);

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
