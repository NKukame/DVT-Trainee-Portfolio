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


function Filter(){
    const {selectedFilter,handleFilterClick,filteredResults, fn, handleChange ,value, setValue, allLanguages, allLocations, allRoles} = useContext(SearchContext)
    console.log(useContext(SearchContext));
    


    
    const [topLanguages, setTopLanguages] = useState(allLanguages.slice(0,8))

    const thumbStyle =  {
        color: 'orange',
        '& .MuiSlider-thumb': { 
            height: 15,
            width: 15,
            backgroundColor: 'rgb(221, 185, 77)',
            border: '2px solid #E2BF00',
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
            backgroundColor: "#E2BF00",
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
        '& .MuiSlider-track': {
            border: 'none',
            height: 2,
            backgroundColor: "#E2BF00"
          }
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
                                onToggle={handleFilterClick}
                                category = "language"
                                isSelected={selectedFilter.includes(language)}
                                />
                                ))}
                    </ul>
                    
                </div>
                <div className="filter-section">
                    <p className="filter-section-title">Roles</p>

                        <ul className="skills-list">
                            {allRoles.map((role) => (
                                <FilterItem 
                                    name={role} 
                                    key={role}
                                    onToggle={handleFilterClick}
                                    isSelected={selectedFilter.includes(role)}
                                    category="role"
                                />
                            ))}
                        </ul>
                </div>
                <div className="filter-section">
                    <p className="filter-section-title">Location</p>
                        <ul className="skills-list">
                            {allLocations.map((location) => (
                                <FilterItem 
                                    name={location} 
                                    key={location}
                                    onToggle={handleFilterClick}
                                    isSelected={selectedFilter.includes(location)}
                                    category="location"
                                />
                            ))}
                        </ul>
                </div>
                <div className="filter-section">
                    <p className="filter-section-title">Experience (years)</p>
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