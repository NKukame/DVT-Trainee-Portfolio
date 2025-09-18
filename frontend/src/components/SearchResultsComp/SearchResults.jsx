import SearchNav from "../SearchNavComp/SearchNav";
import {  SearchContext}  from "../../contexts/SearchContext";
import { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router";
import PaginationControls from '../PaginationControlComp/PaginationControls';
import ResultsList from '../ResultsListComp/ResultsList';


export default function SearchResults() {
  const location = useLocation();
  const { filteredResults, total, totalProjects } = useContext(SearchContext);
  const queryParams = new URLSearchParams(location.search);
  const isProject = queryParams.get("isProject") === "true";
  const [isEmployeeSearch, setIsEmployeeSearch] = useState(!isProject);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const resultsFilter = isEmployeeSearch
      ? filteredResults.filter((result) => !result.project_id)
      : filteredResults.filter((result) => result.project_id);
    setResults(resultsFilter);
  }, [isEmployeeSearch, filteredResults]);

  return (
    <article className="flex-col">
      <SearchNav
        filter={setResults}
        results={results}
        setSearch={setIsEmployeeSearch}
        isPeopleSearch={isEmployeeSearch}
      />

      <section
        className={`flex-1 results-container ${!isEmployeeSearch ? "roundleftSide" : ""}`}
      >
        <ResultsList results={results} isEmployeeSearch={isEmployeeSearch} />
      </section>
      <PaginationControls isEmployeeSearch={isEmployeeSearch}/>
    </article>
  );
}

export function UserSkeletonLoader() {
  const listLoader = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section className="grid-3-cols gap-24-px results-responsive">
      {listLoader.map((items) => {
        return (
          <div key={items} className="card-skeleton shadow">
            <div className="avatar-skeleton shimmer"></div>
            <div className="info-skeleton">
              <div className="line-skeleton short shimmer"></div>
              <div className="line-skeleton shorter shimmer"></div>

              <div className="row-skeleton">
                <div className="icon-line shimmer"></div>
                <div className="icon-line shimmer"></div>
                <div className="icon-line shimmer"></div>
              </div>

              <div className="tags-skeleton">
                <div className="tag shimmer"></div>
                <div className="tag shimmer"></div>
                <div className="tag shimmer"></div>
              </div>

              <div className="button-skeleton shimmer"></div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

