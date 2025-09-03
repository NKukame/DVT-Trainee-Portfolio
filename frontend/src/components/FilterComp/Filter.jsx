import React, { useEffect, useState, useContext } from "react";
import {
  Building05,
  User01,
  Code02,
  Award01,
  MarkerPin04,
  Award02,
  Clock,
} from "@untitled-ui/icons-react";
import { Combobox } from "../ComboComp/Combo";
import { Badge } from "../BadgeComp/Badge";
import { SearchContext } from "../../contexts/SearchContext";
import { toDropdownOptions } from "../../lib/util";

function Filter() {
  const [locationSelected, setLocationSelected] = useState([]);
  const [rolesSelected, setRolesSelected] = useState([]);
  const [technologiesSelected, setTechnologiesSelected] = useState([]);
  const [experienceSelected, setExperienceSelected] = useState([]);
  const [shouldShowTags, setShouldShowTags] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const { allLanguages, allRoles, handleFilterClick, allLocations } =
    useContext(SearchContext);
  // Options for each dropdown
  const locationOptions = toDropdownOptions(allLocations);

  const techOptions = toDropdownOptions(allLanguages);
  const roleOptions = toDropdownOptions(allRoles);

  const expOptions = [
    { value: "0-1 Years", label: "0-1 Years" },
    { value: "1-2 Years", label: "1-2 Years" },
    { value: "3-4 Years", label: "3-4 Years" },
    { value: "4-5 Years", label: "4-5 Years" },
    { value: "5+ Years", label: "5+ Years" },
  ];

  // All selected filters
  const allSelectedFilters = [
    ...locationSelected.map((value) => ({
      type: "location",
      value,
      label: locationOptions.find((opt) => opt.value === value)?.label,
    })),
    ...rolesSelected.map((value) => ({
      type: "role",
      value,
      label: roleOptions.find((opt) => opt.value === value)?.label,
    })),
    ...technologiesSelected.map((value) => ({
      type: "technology",
      value,
      label: techOptions.find((opt) => opt.value === value)?.label,
    })),
    ...experienceSelected.map((value) => ({
      type: "experience",
      value,
      label: expOptions.find((opt) => opt.value === value)?.label,
    })),
  ];

  // Handle removing a filter tag
  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case "location":
        handleFilterClick(value, "Location");
        setLocationSelected((prev) => prev.filter((v) => v !== value));
        break;
      case "role":
        handleFilterClick(value, "Roles");
        setRolesSelected((prev) => prev.filter((v) => v !== value));
        break;
      case "technology":
        handleFilterClick(value, "Technologies");
        setTechnologiesSelected((prev) => prev.filter((v) => v !== value));
        break;
      case "experience":
        setExperienceSelected((prev) => prev.filter((v) => v !== value));
        handleFilterClick(value, "Experience");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (allSelectedFilters.length > 0) {
      setShouldShowTags(true);
      setIsExiting(false);
    } else {
      // Start exit animation
      setIsExiting(true);

      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setShouldShowTags(false);
      }, 100); // Match this to your animation duration

      return () => clearTimeout(timer);
    }
  }, [allSelectedFilters.length]);

  return (
    <section className="filter-container text-lg">
      <div className="filter-section">
        <div className="filter-dropdown mobile-availability">
          <Clock className="filter-section-icon" />
          <Combobox
            placeholder="Availability"
            options={[
              { label: "All" },
              { label: "Available" },
              { label: "On-client" },
            ]}
            value={"All"}
            multiple={false}
            handleFilterClick={handleFilterClick}
          />
        </div>
        <div className="filter-dropdown">
          <MarkerPin04 className="filter-section-icon" />

          <Combobox
            placeholder="Location"
            options={locationOptions}
            value={locationSelected}
            onChange={setLocationSelected}
            multiple={true}
            handleFilterClick={handleFilterClick}
          />
        </div>
        <div className="filter-dropdown">
          <User01 className="filter-section-icon" />
          <Combobox
            placeholder="Roles"
            options={roleOptions}
            value={rolesSelected}
            onChange={setRolesSelected}
            multiple={true}
            handleFilterClick={handleFilterClick}
          />
        </div>
        <div className="filter-dropdown">
          <Code02 className="filter-section-icon" />
          <Combobox
            placeholder="Technologies"
            className=""
            options={techOptions}
            value={technologiesSelected}
            onChange={setTechnologiesSelected}
            multiple={true}
            handleFilterClick={handleFilterClick}
          />
        </div>
        <div className="filter-dropdown">
          <Award01 className="filter-section-icon" />
          <Combobox
            placeholder="Experience"
            options={expOptions}
            value={experienceSelected}
            onChange={setExperienceSelected}
            multiple={true}
            handleFilterClick={handleFilterClick}
          />
        </div>
      </div>

      {shouldShowTags && (
        // <div className="empty-tags-message">No filters selected</div>
        <div
          className={`filter-tag-container ${isExiting ? "filter-tag-container-exit" : ""}`}
        >
          <div className="tag-container">
            {allSelectedFilters.map((filter, index) => (
              <Badge
                key={`${filter.type}-${filter.value}`}
                onClose={() => handleRemoveFilter(filter.type, filter.value)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Filter;
