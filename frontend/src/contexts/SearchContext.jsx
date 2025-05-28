import {useState, useContext, createContext, Children} from 'react'
import {employees, projects} from '../MockSearch.json';

export const SearchContext = createContext()

const data = employees.concat(projects)

export const SearchContextProvider = ({children}) => {
    
    let [searchResults, setSearchResults] = useState(data)
    let [filteredResults, setFilteredResults] = useState(data)
    const [value, setValue] = useState([0, 10]);
    let [selectedFilter, setSelectedFilter] = useState([]);
    
    const allLanguages = [...new Set(searchResults.map((employee) => employee.skills).flat())].filter(item => item !== undefined);
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
        
        if(category.includes("language")){
            updatedResults = searchResults.filter((employee) => {
                if(newSelectedFilter.length === 0) return true;
                if(employee.skills){
    
                    return newSelectedFilter.every((filter) => employee.skills.includes(filter));
                }
            });
        }
        if(category.includes("role")){
            updatedResults = searchResults.filter((employee) => {
                // If no roles selected, show all results
                if (newSelectedFilter.length === 0) return true;
                // Show employee if their role matches any of the selected filters
                return newSelectedFilter.some(f => employee.role === f);
            });
        }

        if (category === "location") {
            updatedResults = searchResults.filter((employee) => {
                if (newSelectedFilter.length === 0) return true;
                return newSelectedFilter.some(f => employee.location === f);
            });
        }
        
        setFilteredResults(updatedResults);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const filteredResults = searchResults.filter((employee) => {
            if(!employee.years_active){
                return false
            }
            
            if(employee.years_active>value[0] &&  employee.years_active<value[1]){
                return true
            }
            return false           
        })

        setFilteredResults(filteredResults);
    };


    return (
        <SearchContext.Provider value={{selectedFilter, handleFilterClick, handleInputChange, filteredResults, setSearchResults, handleChange,value, allLanguages, allLocations, allRoles}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch(){
    const {selectedFilter, handleFilterClick,handleInputChange,filteredResults, setSearchResults, handleChange,value} = useContext(SearchContext)
    return [selectedFilter, handleFilterClick,handleInputChange,filteredResults, setSearchResults, handleChange,value]
}
