import { useState } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import Header from "./Header";
import Search from "../Search";
import {employees, projects} from '../MockSearch.json';


function SearchBar(){
  const [search,setSearch] = useState('')
  const [searchResults, setResults] = useState(employees.concat(projects));

  const handleInputChange = (e) => {
    const search = e.target.value;
    setSearch(search)

    const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(search.toLowerCase())
   } )

    const filteredProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(search.toLowerCase())
   } 
  );

  const results= filteredEmployees.concat(filteredProjects)
  setResults(results)

  }

    return(
      <>
      <Header />
        <div class="input-container">
          <SearchIcon/>
          <input type="text"  placeholder="Search" onChange={handleInputChange}/>
        </div>
      <Search searchResults={searchResults} />
      </>
    )
}
export default SearchBar;


