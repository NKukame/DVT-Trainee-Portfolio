import Filter from "../../components/FilterComp/Filter";
import SearchResults from "../../components/SearchResultsComp/SearchResults";
import SearchBar from "../../components/SearchBarComp/SearchBar";
import AI from "../../components/AI/AI";
import { SearchContextProvider } from "../../contexts/SearchContext";
import { useEffect } from "react";
function Search() {
  
  useEffect(() => {
    if (!window.sessionStorage.getItem("searchPageReloaded")) {
      window.sessionStorage.setItem("searchPageReloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <section className="flex-col align-items-center justify-items-center gap-24-px m-20-px mobile-search">
      <SearchBar />
      <div className="desktop-filter">
        <Filter />
      </div>
      <SearchResults />
      <AI />
    </section>
  );
}

export default Search;
