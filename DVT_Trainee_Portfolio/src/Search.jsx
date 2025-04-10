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
    <div className="app-layout">
        <SideBar />

          <div className="app-layout-body search-layout">
            <SearchContextProvider>
              <section className="search-page">
                <SearchBar />
                <Filter/>
                <div className="">
                  <SearchResults />
                </div>
              </section>
            </SearchContextProvider>
          </div>
    </div>
  );
}

export default Search;
