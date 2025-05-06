import "./Filter.css"
import React, { useEffect, useState } from "react";
import { Building05, User01, Code02, Award01 } from "@untitled-ui/icons-react";
import { Combobox } from "./Combo";
import { Badge } from "./Badge";

function Filter() {
  const [industriesSelected, setIndustriesSelected] = useState([]);
  const [rolesSelected, setRolesSelected] = useState([]);
  const [technologiesSelected, setTechnologiesSelected] = useState([]);
  const [experienceSelected, setExperienceSelected] = useState([]);
  const [shouldShowTags, setShouldShowTags] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Options for each dropdown
  const industryOptions = [
    { value: "sports", label: "Sports" },
    { value: "finance", label: "Finance" },
    { value: "retail", label: "Retail" }
  ];
  
  const roleOptions = [
    { value: "intern", label: "Intern" },
    { value: "junior", label: "Junior" },
    { value: "intermediate", label: "Intermediate" },
    { value: "senior", label: "Senior" },
    { value: "lead", label: "Lead" }
  ];
  
  const techOptions = [
    { value: "docker", label: "Docker" },
    { value: "ios", label: "iOS" },
    { value: "android", label: "Android" },
    { value: "react", label: "React" },
    { value: "javascript", label: "Javascript" },
    { value: "tailwind", label: "Tailwind" }
  ];
  
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
        setRolesSelected(prev => prev.filter(v => v !== value));
        break;
      case "technology":
        setTechnologiesSelected(prev => prev.filter(v => v !== value));
        break;
      case "experience":
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
      }, 600); // Match this to your animation duration
      
      return () => clearTimeout(timer);
    }
  }, [allSelectedFilters.length]);

  return (
    <section className="filter-container">
      <div className="filter-section">
        <div className="filter-dropdown">
          <Building05 />
          <Combobox
            placeholder="Industries"
            options={industryOptions}
            value={industriesSelected}
            onChange={setIndustriesSelected}
            multiple={true}
          />
        </div>
        <div className="filter-dropdown">
          <User01 />
          <Combobox
            placeholder="Roles"
            options={roleOptions}
            value={rolesSelected}
            onChange={setRolesSelected}
            multiple={true}
          />
        </div>
        <div className="filter-dropdown">
          <Code02 />
          <Combobox
            placeholder="Technologies"
            options={techOptions}
            value={technologiesSelected}
            onChange={setTechnologiesSelected}
            multiple={true}
          />
        </div>
        <div className="filter-dropdown">
          <Award01 />
          <Combobox
            placeholder="Experience"
            options={expOptions}
            value={experienceSelected}
            onChange={setExperienceSelected}
            multiple={true}
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
