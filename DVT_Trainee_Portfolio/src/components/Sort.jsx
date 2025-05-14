import { useState } from "react";
import "./Sort.css";
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterLines } from "@untitled-ui/icons-react";

/**
 * Dropdown component for selecting a sort type.
 * Triggers onSortChange prop with selected value.
 */
export function SelectScrollable({ filter, results }) {
  //filter is a function that will update the results component and results is the current results displayed on results component

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    // setSelectedValue(value);
    
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
    case 'New':
      results = results.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'Old':
      results = results.sort((a, b) => new Date(a.date) - new Date(b.date));
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
          // value={}
          onChange={handleChange}
          className="select-control w-[280px]"
        >
          <option value="" disabled>
            Sort by
          </option>

          <optgroup label="Alphabetical">
            <option value="Asc">Ascending</option>
            <option value="Desc">Descending</option>
          </optgroup>

          <optgroup label="Date">
            <option value="New">Newest</option>
            <option value="Old">Oldest</option>
          </optgroup>
        </select>
      </div>

    </div>
  );
}
