import { useState } from "react";
import "./Sort.css";
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterLines } from "@untitled-ui/icons-react";

/**
 * Dropdown component for selecting a sort type.
 * Triggers onSortChange prop with selected value.
 */
export function SelectScrollable({ filter, results }) {
  const [selectedValue, setSelectedValue] = useState("");  // Initialize with empty string

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    setSelectedValue(value);
    
    console.log(results)
    

    switch (value) {
  case 'Asc':
    results = [...results]
    .sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    break;
  case 'Desc':
    results = [...results].sort((a, b) =>
      b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
    break;
    case "availability_asc":
    results = [...results].sort((a, b) => new Date(a.availability_date) - new Date(b.availability_date));
    break;
  case "availability_desc":
    results = [...results].sort((a, b) => new Date(b.availability_date) - new Date(a.availability_date));

    break;
    default:
      break;
  }

    filter(results)
    
  };

  return (
    <div className="sort-container">
      <div className="select-wrapper">
        <select
          value={selectedValue}
          onChange={handleChange}
          className="select-control w-[280px]"
        >
          <option value="" selected>
            Sort by
          </option>

          <optgroup label="Alphabetical">
            <option value="Asc">Ascending</option>
            <option value="Desc">Descending</option>
          </optgroup>
         
          <optgroup label="Availability">
            <option value="availability_asc">Earliest</option>
            <option value="availability_desc">Latest</option>
          </optgroup>

          {/* <optgroup label="Date">
            <option value="New">Newest</option>
            <option value="Old">Oldest</option>
          </optgroup> */}
        </select>
      </div>

    </div>
  );
}
