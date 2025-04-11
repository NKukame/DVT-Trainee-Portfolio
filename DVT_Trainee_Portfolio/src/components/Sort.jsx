import { useState } from "react";
import "./Sort.css"
import FilterListIcon from '@mui/icons-material/FilterList';

export function SelectScrollable() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className= "sort-container">
    
    <div className="select-wrapper">
      <select
        value={selectedValue}
        onChange={handleChange}
        className="select-control w-[280px]"
      >
        <option value="" disabled>
          Sort by
        </option>
        
        <optgroup label="Alphabetical">
          <option value="Asc">Ascending </option>
          <option value="Desc">Descending</option>
          
        </optgroup>
        
        <optgroup label="Date">
          <option value="New">Newest</option>
          <option value="Old">Oldest</option>
          
        </optgroup>
        
      </select>
    </div>
      
      <FilterListIcon sx={{fontSize:36}}></FilterListIcon>
    </div>

  );
}


