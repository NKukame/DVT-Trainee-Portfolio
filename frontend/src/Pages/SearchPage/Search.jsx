import "../../styles.css";
import SideBar from "../../components/SidebarComp/SideBar";
import Filter from "../../components/FilterComp/Filter";
import SearchResults from "../../components/SearchResultsComp/SearchResults";
import SearchBar from "../../components/SearchBarComp/SearchBar";
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
    <div className="app-layout">
        <SideBar />

          <div className="app-layout-body">
          
              <section className="flex-col align-items-center justify-items-center gap-24-px m-20-px">
                <SearchBar />
                <Filter/>
                <SearchResults />
              </section>
          </div>
    </div>
  );
}

export default Search;
