import "./styles.css";
import "./Search.css";
import SideBar from "./components/SideBar";
import Filter from "./components/Filter";
import SearchResults from "./components/SearchResults";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { SearchContextProvider } from "./contexts/SearchContext";
function Search() {
  return (
    <>
      <div className="app-layout">
        <SideBar />

        <div className="app-layout-body">
          <SearchContextProvider>
            <SearchBar />
            <section className="search-box">
              <div className="r-container-filter">
                <Filter />
                <SearchResults />
              </div>
            </section>
          </SearchContextProvider>
        </div>
      </div>
    </>
  );
}

export default Search;
