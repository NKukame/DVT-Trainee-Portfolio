import "./Filter.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react";
import { generatePastelColor } from "../lib/color";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { SearchContext, useSearch } from "../contexts/SearchContext";
import { useContext } from "react";
import ComboboxDemo from "./Combo";
import { Award, Building, Code, User } from "lucide-react";


function Filter(){
    const {selectedFilter,handleFilterClick,filteredResults, fn, handleChange ,value, setValue, allLanguages, allLocations, allRoles} = useContext(SearchContext)
    console.log(useContext(SearchContext));
    
    return(
        <section className="filter-container">
            <div className="filter-section">
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Roles</p> */}
                    <Building size={32}    />
                    <ComboboxDemo/>
                </div>
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Experience (years)</p> */}
                    <User  size={32} />
                    <ComboboxDemo/>
                </div>
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Technologies</p> */}
                    <Code size={32} />
                    <ComboboxDemo/>
                </div>
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Location</p> */}
                    <Award size={32}  />
                    <ComboboxDemo/>
                </div>
            </div>
            <div className="filter-tag-container">
                <div className="tag-container">
                    
                </div>
            </div>
        </section>
    );
}



export function FilterItem({name, onToggle, isSelected, category}){
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    const itemStyle = {
        borderColor: isSelected
      ? generatePastelColor(name)
      : isHover
      ? generatePastelColor(name)
      : "rgba(255, 255, 255, 0.315)",
        cursor: "pointer",
        transition: "border-width .05s ease-in-out",
        borderWidth: isSelected ? "2px": isHover ? "1px" : "1px"
    }

    return(
        // <div className={`filter-content ${isSelected ? "selected" : ""}`}>
        //     <span className="filter-content-circle" style={{backgroundColor: generatePastelColor(name)}}></span>
        //     <p className="filter-content-name" onClick={() => onToggle(name)}>{name}</p>
        // </div>

        <li onClick={() => onToggle(name, category)}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="badge" style={itemStyle} ><p>{name}</p></li>
    )
}



export default Filter;