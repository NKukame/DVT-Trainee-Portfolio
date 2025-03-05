import "./Filter.css"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react";
import { generatePastelColor } from "../lib/color";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Filter({searchResults, fn}){
    console.log(searchResults);
    
    // Get all unique languages and roles
    const languages = searchResults.map((employee) => employee.skills);
    const roles = searchResults.map((employee) => employee.role);
    // Remove duplicates
    const allLanguages = [...new Set(languages.flat())];
    const [topLanguages, setTopLanguages] = useState(allLanguages.slice(0,3))
    const allRoles = [...new Set(roles)];

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
            return newSelectedFilter.some((filter) => employee.skills.includes(filter));
        });

        console.log(filteredResults);
        
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
    return(
        <section className="filter-container">
            <div className="filter-title">
                <h3 className="logo-text">Filter</h3>
                <FilterAltIcon/>
            </div>
            <div className="divider"></div>
            <div className="scroller">
                <div className="filter-section">
                    <div className="header-container">
                        <p className="filter-section-title">Languages</p>
                        <p onClick={()=>{
                            if(topLanguages.length>3){
                                setTopLanguages(allLanguages.slice(0,3))
                            }else{
                                setTopLanguages(allLanguages)
                            }}}>
                            {topLanguages.length>3? <RemoveIcon className="header-icon" fontSize="small"/>:<AddIcon fontSize="small" className="header-icon"/>}
                        </p>
                    </div>
                    <div className="filter-content-container">
                        {topLanguages.map((language) => (
                            <FilterItem 
                                key={language}
                                name={language} 
                                onToggle={handleFilterClickLanguage}
                                isSelected={selectedFilter.includes(language)}
                            />
                        ))}
                    </div>
                    
                </div>
                <div className="divider"></div>
                <div className="filter-section">
                    <p className="filter-section-title">Roles</p>
                    <div className="filter-content-container">
                        {allRoles.map((role) => (
                            <FilterItem 
                                name={role} 
                                key={role}
                                onToggle={handleFilterClickRole}
                                isSelected={selectedFilter.includes(role)}
                            />
                        ))}
                    </div>
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



function FilterItem({name, onToggle, isSelected}){
    return(
        <div className={`filter-content ${isSelected ? "selected" : ""}`}>
            <span className="filter-content-circle" style={{backgroundColor: generatePastelColor(name)}}></span>
            <p className="filter-content-name" onClick={() => onToggle(name)}>{name}</p>
        </div>
    )
}



export default Filter;