import { useContext, useState } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import Header from "./Header";
import { SearchContext, useSearch } from "../contexts/SearchContext.jsx";

function SearchBar(){
  const [query,setQuery] = useState('')
  const {handleInputChange} = useContext(SearchContext);
  
  

    return(
      <>
      <Header />
        <div class="input-container">
          <SearchIcon/>
          <input type="text"  placeholder="Search" onChange={(e) => handleInputChange(e.target.value)}/>
        </div>
      </>
    )
}
export default SearchBar;


