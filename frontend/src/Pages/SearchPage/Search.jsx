import SideBar from "../../components/SidebarComp/SideBar";
import Filter from "../../components/FilterComp/Filter";
import SearchResults from "../../components/SearchResultsComp/SearchResults";
import SearchBar from "../../components/SearchBarComp/SearchBar";
import { SearchContextProvider } from "../../contexts/SearchContext";
function Search() {
  return (
    <section className="flex-col align-items-center justify-items-center gap-24-px m-20-px mobile-search">
      <SearchBar />
      <div className="desktop-filter">
        <Filter />
      </div>
      <SearchResults />
    </section>
  );
}

export default Search;
