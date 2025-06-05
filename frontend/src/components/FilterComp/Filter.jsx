import "./Filter.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react";
import { generatePastelColor } from "../../lib/color";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { SearchContext, useSearch } from "../../contexts/SearchContext";
import { useContext } from "react";
import {Combobox} from "../ComboComp/Combo";
// import { Award, Building, Code, User } from "lucide-react";
import { Badge } from "../BadgeComp/Badge";
import { Award01, Building05, Code02, User01 } from "@untitled-ui/icons-react";
import Badges from "../BadgeComp/Badges";


function Filter(){
    const {selectedFilter,handleFilterClick,filteredResults, fn, handleChange ,value, setValue, allLanguages, allLocations, allRoles} = useContext(SearchContext)
    // console.log(useContext(SearchContext));
    
    return(
        <section className="filter-container">
            <div className="filter-section">
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Roles</p> */}
                    {/* <Building size={32}    /> */}
                    <Building05/>
                    <Combobox placeholder="Industries" options={["Sports", "Finance", "Retail"]}/>
                </div>
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Experience (years)</p> */}
                    {/* <User  size={32} /> */}
                    <User01/>
                    <Combobox placeholder="Roles" options={["Intern", "Junior", "Intermediate", "Senior", "Lead"]}/>
                </div>
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Technologies</p> */}
                    {/* <Code size={32} />
                     */}
                    <Code02/>
                    <Combobox placeholder="Technologies" options={["Docker", "iOS", "Android"]}/>
                </div>
                <div className="filter-dropdown">
                    {/* <p className="filter-section-title">Location</p> */
                    }
                    
                    {/* <Award size={32}  /> */}
                    <Award01/>
                    <Combobox placeholder="Experience" options={["0-2 Years", "2-5 Years", "6-10 Years"]}/>
                </div>
            </div>
            <div className="filter-tag-container">
                <div className="tag-container">
                    <Badges badgeList={["HTML", "Javascript", "Docker", "Node"]} sliceList={false}  />
                    {/* <Badge onClose={true}>React</Badge>
                    <Badge >Javascript</Badge>
                    <Badge onClose={true}>Tailwind</Badge>
                    <Badge onClose={true}>Docker</Badge> */}
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