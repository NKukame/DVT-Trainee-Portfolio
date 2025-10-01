import { useState } from "react";
import Switch from "@mui/material/Switch";
import { SearchContext } from "../../contexts/SearchContext";
import { useContext } from "react";

/**
 * Switch component for selecting a sort type.
 * Triggers onSortChange prop with selected value.
 */
export function SelectScrollable({ isPeopleSearch }) {
  const [isAvailable, setIsAvailable] = useState(false); // true -> Available, false -> All
  const { searchData, query, params } = useContext(SearchContext);


  const handleToggle = (event) => {
    const checked = event.target.checked;
    setIsAvailable(checked);
    searchData(1, query, params, checked);
  };

  // Only show toggle for people search, not projects
  if (!isPeopleSearch) {
    return null;
  }

  return (
    <div className="sort-container">
      <div className="toggle-wrapper">
        <span className={`toggle-label ${!isAvailable ? "active" : ""}`}>
          All
        </span>
        <Switch checked={isAvailable} onChange={handleToggle} color="primary" title="Toggle Availability Filter"/>
        <span className={`toggle-label ${isAvailable ? "active" : ""}`}>
          Available
        </span>
      </div>
    </div>
  );
}

