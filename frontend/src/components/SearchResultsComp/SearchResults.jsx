import SearchNav from "../SearchNavComp/SearchNav";
import { useSearch } from "../../contexts/SearchContext";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import PaginationControls from '../PaginationControlComp/PaginationControls';
import ResultsList from '../ResultsListComp/ResultsList';
import '../SearchResultsComp/SearchPage.css';

export default function SearchResults() {

  const location = useLocation();
  const [,,, filteredResults,,,,total] = useSearch();
  const queryParams = new URLSearchParams(location.search);
  const isProject = queryParams.get("isProject") === "true";
  const [isEmployeeSearch, setIsEmployeeSearch] = useState(!isProject);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  useEffect(() => {   
    
    const resultsFilter =  isEmployeeSearch ? filteredResults.filter((result)=> !result.project_id) 
                    : filteredResults.filter((result)=> result.project_id);
    setResults(resultsFilter);
    setCurrentPage(1);
  }, [isEmployeeSearch, filteredResults]);
    
  const displayedItems = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };

  return (
    <article className="flex-col">
      <SearchNav 
        filter={setResults} 
        results={results} 
        setSearch={setIsEmployeeSearch} 
        isPeopleSearch={isEmployeeSearch} 
      />

      <section className="flex-1 results-container">
          <ResultsList results={displayedItems} isEmployeeSearch={isEmployeeSearch} />
      </section>
        <PaginationControls 
          totalItems={results.length} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          onPageChange={handleChangePage} 
        />
    </article>
  );
}

export function UserSkeletonLoader(){
  const listLoader = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return(
    <section className="grid-3-cols gap-24-px">
        {  
          listLoader.map((items)=>{
            return (
              <div class="card-skeleton shadow">
                <div class="avatar-skeleton shimmer"></div>
                <div class="info-skeleton">
                  <div class="line-skeleton short shimmer"></div>
                  <div class="line-skeleton shorter shimmer"></div>
      
                  <div class="row-skeleton">
                    <div class="icon-line shimmer"></div>
                    <div class="icon-line shimmer"></div>
                    <div class="icon-line shimmer"></div>
                  </div>
      
                  <div class="tags-skeleton">
                    <div class="tag shimmer"></div>
                    <div class="tag shimmer"></div>
                    <div class="tag shimmer"></div>
                  </div>
      
                  <div class="button-skeleton shimmer"></div>
                </div>
              </div>
            )
          })
        }
    </section>
  )
}