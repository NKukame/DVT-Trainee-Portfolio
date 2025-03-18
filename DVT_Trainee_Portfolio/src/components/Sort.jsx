import { useState } from 'react';  // Import only necessary React hooks
import './Sort.css';  // Import the CSS file

const SortDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    // Handle sorting logic here based on the selected option
    console.log(`Selected sort option: ${event.target.value}`);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="sort-options" className="dropdown-label">
        {/* Sort by */}
      </label>
      <select
        id="sort-options"
        className="dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        {/* <option value="">Select Sort Option</option> */}
        <option value="alphabetical-asc">Alphabetically, A-Z</option>
        <option value="alphabetical-desc">Alphabetically, Z-A</option>
        <option value="date-old-new"> old to new</option>
        <option value="date-new-old"> new to old</option>
      </select>
    </div>
  );
};

export default SortDropdown;
