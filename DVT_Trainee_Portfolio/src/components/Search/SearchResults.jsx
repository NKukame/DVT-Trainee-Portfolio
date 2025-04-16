
import SearchNav from "../SearchNav";
import { useSearch } from "../../contexts/SearchContext";
import { useEffect, useState } from 'react';
import PaginationControls from './PaginationControls';
import ResultsList from './ResultsList';

import './styles/index.css';

export default function SearchResults() {

  const [,,, filteredResults] = useSearch();
  const [resultsCopy, setCopy] = useState(filteredResults);
  const [currentSearch, setCurrentSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
    <article className="">
      <SearchNav 
        filter={setCopy} 
        results={filteredResults} 
        setCurrentSearch={setCurrentSearch} 
        currentSearch={currentSearch} 
      />

      <section className="results-container flex-col-fill">
        <ResultsList results={displayedItems} isEmployeeSearch={currentSearch} />

        <PaginationControls
          totalItems={resultsCopy.length} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          onPageChange={handleChangePage} 
        />
      </section>
    </article>
  );
}
