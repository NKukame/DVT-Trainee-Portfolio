import { useContext, useState } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import Header from "./Header";
import { SearchContext, useSearch } from "../contexts/SearchContext.jsx";

function SearchBar(){
  const {handleInputChange} = useContext(SearchContext);
  
  

    return(
      <>
      {/* <Header /> */}
        <div class="input-container">
          <SearchIcon/>
          <input type="text"  placeholder="Find people or projects" onChange={(e) => handleInputChange(e.target.value)}/>
        </div>
      </>
    )
}
export default SearchBar;

