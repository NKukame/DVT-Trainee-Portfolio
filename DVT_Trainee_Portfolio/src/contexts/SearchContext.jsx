import {useState, useContext, createContext, Children} from 'react'
import {employees, projects} from '../MockSearch.json';

export const SearchContext = createContext({
    searchResults: [],
    setSearchResults: () => {},
})

const data = employees.concat(projects)

export const SearchContextProvider = ({children}) => {
    
    const [searchResults, setSearchResults] = useState(data)
    const [filteredResults, setFilteredResults] = useState(data)

    const handleInputChange = (query) => {
        const filteredResults = data.filter((result) => {
            return result.name.toLowerCase().includes(query.toLowerCase())
        });
        
        const results= filteredResults
        setSearchResults(results)
        setFilteredResults(results)
    }


    
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

                return newSelectedFilter.every((filter) => employee.skills.includes(filter));
            }
        });

        
        
        setFilteredResults(filteredResults);
    }


    return (
        <SearchContext.Provider value={{selectedFilter, handleFilterClickLanguage, handleInputChange, filteredResults, setSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch(){
    const {selectedFilter, handleFilterClickLanguage,handleInputChange,filteredResults, setSearchResults} = useContext(SearchContext)
    return [selectedFilter, handleFilterClickLanguage,handleInputChange,filteredResults, setSearchResults]
}
