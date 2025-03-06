import "./Filter.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react";
import { generatePastelColor } from "../lib/color";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function Filter({searchResults, fn}){
    
    // Get all unique languages and roles
    const languages = searchResults.map((employee) => employee.skills);
    const roles = searchResults.map((employee) => employee.role);
    // Remove duplicates
    const allLanguages = [...new Set(languages.flat())];
    const [topLanguages, setTopLanguages] = useState(allLanguages.slice(0,8))
    const allRoles = [...new Set(roles)];

    const [selectedFilter, setSelectedFilter] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState([]);

    const handleFilterClickLanguage = (filter) => {
        let newSelectedFilter;
        if(selectedFilter.includes(filter)){
            // Remove filter
            newSelectedFilter = selectedFilter.filter((item) => item !== filter);
        }else{
            // Add filter
            newSelectedFilter =  [...selectedFilter, filter];
        }

        setSelectedFilter(newSelectedFilter);
        
        const filteredResults = searchResults.filter((employee) => {
            if(newSelectedFilter.length === 0) return true;
            if(employee.skills){

                return newSelectedFilter.some((filter) => employee.skills.includes(filter));
            }
        });


        
        fn(filteredResults);
    }

    const handleFilterClickRole = (filter) => {
        let newSelectedFilter;
        if(selectedFilter.includes(filter)){
            // Remove the filter
            newSelectedFilter = selectedFilter.filter((item) => item !== filter);
        } else {
            // Add the filter
            newSelectedFilter = [...selectedFilter, filter];
        }
        
        setSelectedFilter(newSelectedFilter);
        
        
        const filteredResults = searchResults.filter((employee) => {
            // If no roles selected, show all results
            if (newSelectedFilter.length === 0) return true;
            // Show employee if their role matches any of the selected filters
            return newSelectedFilter.some(f => employee.role === f);
        });
        
        fn(filteredResults);
    }
    
    const [value, setValue] = useState([0, 10]);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);

    const filteredResults = searchResults.filter((employee) => {
        // console.log(employee);
        if(!employee.years_active){
            console.log("years available");
            
            return false
        }
        console.log(value[0]);
        
        // console.log(employee.years_active);
        
        if(employee.years_active>value[0] &&  employee.years_active<value[1]){
            return true
        }
        return false
        
    })

    fn(filteredResults);
    
  };

    const thumbStyle =  {
        color: 'orange',
        '& .MuiSlider-thumb': { 
            height: 20,
            width: 20,
            backgroundColor: 'white',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
            },
            '&::before': {
            display: 'none',
            },
        },

        '& .MuiSlider-valueLabel': {
            lineHeight: 1,
            fontSize: 14,
            background: 'unset',
            padding: 0,
            width: 20,
            height: 20,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: 'orange',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&::before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
        


    }

    return(
        <section className="filter-container">
            {/* <div className="filter-title">
                <h3 className="logo-text">Filter</h3>
                <FilterAltIcon/>
            </div> */}
            {/* <div className="divider"></div> */}
            <div className="scroller">
                <div className="filter-section">
                    <div className="header-container">
                        <p className="filter-section-title">Languages</p>
                        <p onClick={()=>{
                            if(topLanguages.length>8){
                                setTopLanguages(allLanguages.slice(0,8))
                            }else{
                                setTopLanguages(allLanguages)
                            }}}>
                            {topLanguages.length>8? <RemoveIcon className="header-icon" fontSize="small"/>:<AddIcon fontSize="small" className="header-icon"/>}
                        </p>
                    </div>
                    <ul className="skills-list">
                        {topLanguages.map((language) => (
                            <FilterItem 
                                key={language}
                                name={language} 
                                onToggle={handleFilterClickLanguage}
                                isSelected={selectedFilter.includes(language)}
                                />
                                ))}

                            {/* <Badges badgeList={topLanguages}></Badges> */}

                    </ul>
                    
                </div>
                {/* <div className="divider"></div> */}
                <div className="filter-section">
                    <p className="filter-section-title">Roles</p>
                    {/* <div className="filter-content-container"> */}
                        <ul className="skills-list">
                            {allRoles.map((role) => (
                                <FilterItem 
                                    name={role} 
                                    // key={role}
                                    // onToggle={handleFilterClickRole}
                                    // isSelected={selectedFilter.includes(role)}
                                />
                            ))}
                        </ul>

                        {/* <Badges badgeList={allRoles}></Badges> */}
                    {/* </div> */}
                </div>
                <div className="filter-section">
                    <p className="filter-section-title">Experience</p>
                    <Box  sx={{padding:1.5}}>
                        <Slider
                            size="small"
                            min={0}
                            max={10}
                            shiftStep={3}
                            step={1}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            sx={
                               thumbStyle
                            }
                        />
                        

                    </Box>
                </div>
                {/* <div className="divider"></div>
                <div className="filter-section">
                    <p className="filter-section-title">Tools</p>
                    <div className="filter-content-container">
                        <FilterItem name={"React"}/>
                        <FilterItem name={"Node.js"}/>
                        <FilterItem name={"Express"}/>
                        <FilterItem name={"MongoDB"}/>
                        <FilterItem name={"MySQL"}/>
                        <FilterItem name={"PostgreSQL"}/>   
                        <FilterItem name={"Docker"}/>
                        <FilterItem name={"Jenkins"}/>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="filter-section">
                    <p className="filter-section-title">Operating System</p>
                    <div className="filter-content-container">
                        <FilterItem name={"Windows"}/>
                        <FilterItem name={"Linux"}/>
                        <FilterItem name={"MacOS"}/>
                        <FilterItem name={"iOS"}/>
                        <FilterItem name={"Android"}/>
                    </div>
                </div> */}
            </div>
        </section>
    );
}



export function FilterItem({name, onToggle, isSelected}){
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
        transition: "border-width .5s ease-in-out",
        borderWidth: isSelected ? "2.2px": isHover ? "2px" : "1px"
    }

    return(
        // <div className={`filter-content ${isSelected ? "selected" : ""}`}>
        //     <span className="filter-content-circle" style={{backgroundColor: generatePastelColor(name)}}></span>
        //     <p className="filter-content-name" onClick={() => onToggle(name)}>{name}</p>
        // </div>

        <li onClick={() => onToggle(name)}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="badge" style={itemStyle} ><p>{name}</p></li>
    )
}



export default Filter;