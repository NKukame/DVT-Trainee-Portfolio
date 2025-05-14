import {useState, useContext, createContext, Children} from 'react'
import {employees, projects} from '../MockSearch.json';

export const SearchContext = createContext()

const data = employees.concat(projects)

export const SearchContextProvider = ({children}) => {
    
    let [searchResults, setSearchResults] = useState(data)
    let [filteredResults, setFilteredResults] = useState(data)
    let [selectedFilter, setSelectedFilter] = useState([]);
    
    const allLanguages = [...new Set(searchResults.map((employee) => employee.skills).flat())].filter(item => item !== undefined);
    const allIndustries = [...new Set(searchResults.map((employee) => employee.industries).flat())].filter(item => item !== undefined);
    const allRoles = [...new Set(searchResults.map((employee) => employee.role))].filter(item => item !== undefined);
    const allLocations = [...new Set(searchResults.map((employee) => employee.location))].filter(item => item !== undefined)

    const handleInputChange = (query) => {
        const filteredResults = data.filter((result) => {
            return result.name.toLowerCase().includes(query.toLowerCase())
        });
        
        const results= filteredResults
        setSearchResults(results)
        setFilteredResults(results)
    }

    const handleFilterClick = (filter, category) => {
        let newSelectedFilter;
        let updatedResults = searchResults;
        if(selectedFilter.includes(filter)){
            // Remove filter
            newSelectedFilter = selectedFilter.filter((item) => item !== filter);
        }else{
            // Add filter
            newSelectedFilter =  [...selectedFilter, filter];
        }
        setSelectedFilter(newSelectedFilter);
        
        console.log(filter, category);
        console.log(newSelectedFilter);
        

        if(category.includes("Technologies")){
            
            updatedResults = searchResults.filter((employee) => {
                if(newSelectedFilter.length === 0) return true;
                if(employee.skills){
                    const lowerSkills = employee.skills.map(x => x.toLowerCase())
                    console.log(lowerSkills);        
                    
                    return newSelectedFilter.some((filter) => lowerSkills.includes(filter.toLowerCase()));
                }

                if(employee.technologies){
                    const lowerSkills = employee.technologies.map(x => x.toLowerCase())
                    console.log(lowerSkills);        
                    
                    return newSelectedFilter.some((filter) => lowerSkills.includes(filter.toLowerCase()));
                }
            });
            console.log(updatedResults.length);
        }
        if(category.includes("Industries")){
            
            updatedResults = searchResults.filter((employee) => {
                if(newSelectedFilter.length === 0) return true;
                if(employee.industries){
                    const lowerIndustries = employee.industries.map(x => x.toLowerCase())
                    console.log(filter);      
                    
                    return newSelectedFilter.some((filter) => lowerIndustries.includes(filter.toLowerCase()));
                }
            });
            console.log(updatedResults.length);
        }

        

        if(category.includes("Roles")){
            updatedResults = searchResults.filter((employee) => {
                if(newSelectedFilter.length === 0) return true;
                if(employee.skills){
                    if (newSelectedFilter.length === 0) return true;
                    return newSelectedFilter.some(f => employee.role.toLowerCase() === f);
                }
            });


        }

        if (category === "location") {
            updatedResults = searchResults.filter((employee) => {
                if (newSelectedFilter.length === 0) return true;
                return newSelectedFilter.some(f => employee.location === f);
            });
        }

        if (category === "Experience") {
            updatedResults = handleChange(filter)
        }
        
        setFilteredResults(updatedResults);
    }

    const handleChange = (newValue) => {
        const years =  newValue.split(" ")[0]
        const value = years.split("-")
        console.log(value);
        
        const filteredResults = searchResults.filter((employee) => {
            if(!employee.years_active){
                return false
            }
            
            if(employee.years_active > parseInt(value[0]) &&  employee.years_active < parseInt(value[1])){
                return true
            }
            return false           
        })

        return filteredResults
    };


    return (
        <SearchContext.Provider value={{selectedFilter, handleFilterClick, handleInputChange, filteredResults, setSearchResults, handleChange, allLanguages, allLocations, allRoles, allIndustries}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch(){
    const {selectedFilter, handleFilterClick,handleInputChange,filteredResults, setSearchResults, handleChange} = useContext(SearchContext)
    return [selectedFilter, handleFilterClick,handleInputChange,filteredResults, setSearchResults, handleChange]
}
