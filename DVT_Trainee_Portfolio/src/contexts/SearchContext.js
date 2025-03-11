import {useState, useContext, createContext, Children} from 'react'


export const SearchContext = createContext({
    searchResults: [],
    setSearchResults: () => {},
})

export const SearchContextProvider = ({children}) => {
    const [searchResults, SetsearchResults] = useState([])
    return (
        <SearchContext.Provider value={{searchResults, setSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch(){
    const {searchResults, setSearchResults} = useContext(SearchContext)
    return [searchResults, searchResults]
}