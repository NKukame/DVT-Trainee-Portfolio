import "./Filter.css"
import React, { useEffect, useState, useContext } from "react";
import { Building05, User01, Code02, Award01 } from "@untitled-ui/icons-react";
import { Combobox } from "../ComboComp/Combo";
import { Badge } from "../BadgeComp/Badge";
import { SearchContext } from "../../contexts/SearchContext";
import { toDropdownOptions } from "../../lib/util";

function Filter() {
  const [industriesSelected, setIndustriesSelected] = useState([]);
  const [rolesSelected, setRolesSelected] = useState([]);
  const [technologiesSelected, setTechnologiesSelected] = useState([]);
  const [experienceSelected, setExperienceSelected] = useState([]);
  const [shouldShowTags, setShouldShowTags] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const {allLanguages, allRoles, handleFilterClick, allIndustries} = useContext(SearchContext)


  


  // Options for each dropdown
  const industryOptions = toDropdownOptions(allIndustries)
  

  
  const techOptions = toDropdownOptions(allLanguages);
  const roleOptions = toDropdownOptions(allRoles);
  
  const expOptions = [
    { value: "0-2", label: "0-2 Years" },
    { value: "2-5", label: "2-5 Years" },
    { value: "6-10", label: "6-10 Years" }
  ];
  

  // All selected filters
  const allSelectedFilters = [
    ...industriesSelected.map(value => ({
      type: "industry",
      value,
      label: industryOptions.find(opt => opt.value === value)?.label
    })),
    ...rolesSelected.map(value => ({
      type: "role",
      value,
      label: roleOptions.find(opt => opt.value === value)?.label
    })),
    ...technologiesSelected.map(value => ({
      type: "technology",
      value,
      label: techOptions.find(opt => opt.value === value)?.label
    })),
    ...experienceSelected.map(value => ({
      type: "experience",
      value,
      label: expOptions.find(opt => opt.value === value)?.label
    }))
  ];

  // Handle removing a filter tag
  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case "industry":
        setIndustriesSelected(prev => prev.filter(v => v !== value));
        break;
      case "role":
        handleFilterClick(value, "Roles")
        setRolesSelected(prev => prev.filter(v => v !== value));
        break;
      case "technology":
        handleFilterClick(value, "Technologies")
        setTechnologiesSelected(prev => prev.filter(v => v !== value));
        break;
        case "experience":
        handleFilterClick(value, "Experience")
        setExperienceSelected(prev => prev.filter(v => v !== value));
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
      },100); // Match this to your animation duration
      
      return () => clearTimeout(timer);
    }
  }, [allSelectedFilters.length]);

  return (
    <section className="filter-container">
      <div className="filter-section">
        <div className="filter-dropdown">
          <Building05 color="var(--filter-section-icon-colour)"/>
          <Combobox
            placeholder="Industries"
            options={industryOptions}
            value={industriesSelected}
            onChange={setIndustriesSelected}
            multiple={true}
            handleFilterClick={handleFilterClick}
          />
        </div>
        <div className="filter-dropdown">
          <User01 color="var(--filter-section-icon-colour)"/>
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
          <Code02 color="var(--filter-section-icon-colour)"/>
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
          <Award01 color="var(--filter-section-icon-colour)"/>
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
      <div  className={`filter-tag-container ${isExiting ? 'filter-tag-container-exit' : ''}`}>
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
