import { useState } from "react";
import "./Sort.css";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

/**
 * Switch component for selecting a sort type.
 * Triggers onSortChange prop with selected value.
 */
export function SelectScrollable({ filter, results }) {
  const [isAvailable, setIsAvailable] = useState(false); // true -> Available, false -> On Client

  const handleToggle = (event) => {
    const checked = event.target.checked;
    setIsAvailable(checked);

    let sorted = [...results];

    if (checked) {
      // Available first
      sorted.filter((a) => a.availability === true).sort((a, b) => {
        const x = a.availability;
        const y = b.availability;
        return x === y ? 0 : x ? -1 : 1;
      });
    } else {
      // On Client first
      sorted.filter((a) => a.availability === false).sort((a, b) => {
        const x = a.availability;
        const y = b.availability;
        return x === y ? 0 : y ? -1 : 1;
      });
    }

    filter(sorted);
  };

  return (
    <div className="sort-container">
      <FormControlLabel
        control={
          <Switch
            checked={isAvailable}
            onChange={handleToggle}
            color="primary"
          />
        }
        label={isAvailable ? "Available" : "On Client"}
      />
    </div>
  );
}
