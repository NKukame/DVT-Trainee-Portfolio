import Filter from "../../components/FilterComp/Filter";
import SearchResults from "../../components/SearchResultsComp/SearchResults";
import SearchBar from "../../components/SearchBarComp/SearchBar";
import AI from "../../components/AI/AI";
import { SearchContextProvider } from "../../contexts/SearchContext";
import { useUserStore } from "../../lib/useUser.js";
import { useEffect } from "react";
function Search() {
  return (
    <SearchContextProvider>
      <section className="flex-col align-items-center justify-items-center gap-24-px m-20-px mobile-search">
        <SearchBar />
        <div className="desktop-filter">
          <Filter />
        </div>
        <SearchResults />
        <AI />
      </section>
      </SearchContextProvider>
      );
    
    
}

export default Search;
