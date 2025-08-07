import { useState, useEffect, useRef } from "react";
import "./Sort.css";
import Switch from '@mui/material/Switch';


/**
* Switch component for selecting a sort type.
* Triggers onSortChange prop with selected value.
*/
export function SelectScrollable({ filter, results, isPeopleSearch }) {
  const [isAvailable, setIsAvailable] = useState(false); // true -> Available, false -> All
  const originalResults = useRef([]);

  useEffect(() => {
    if (results.length > 0 && originalResults.current.length === 0) {
      originalResults.current = [...results];
    }
  }, [results]);

  const handleToggle = (event) => {
    const checked = event.target.checked;
    setIsAvailable(checked);

    console.log("Filtering by availability:", checked ? "Available only" : "All candidates");
    
    let sorted;
    if (checked) {
      // Show only available candidates
      sorted = originalResults.current.filter((a) => a.availability);
    } else {
      // Show all candidates
      sorted = [...originalResults.current];
    }

    filter(sorted);
  };

  // Only show toggle for people search, not projects
  if (!isPeopleSearch) {
    return null;
  }

  return (
    <div className="sort-container">
      <div className="toggle-wrapper">
        <span className={`toggle-label ${!isAvailable ? 'active' : ''}`}>All</span>
        <Switch
          checked={isAvailable}
          onChange={handleToggle}
          color="primary"
        />
        <span className={`toggle-label ${isAvailable ? 'active' : ''}`}>Available</span>
      </div>
    </div>
  );
}
 