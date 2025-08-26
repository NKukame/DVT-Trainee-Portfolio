import { useContext, useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContext } from "../../contexts/SearchContext.jsx";

function SearchBar() {
  const { handleInputChange } = useContext(SearchContext);
  const [query, setQuery] = useState("");

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(debounce(handleInputChange, 1000), [
    handleInputChange,
  ]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="input-container">
      <SearchIcon />
      <input
        type="text"
        placeholder="Find people or projects"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
