import './styles.css';
import './Search.css';

import Filter from './components/Filter';
import SearchResults from './components/SearchResults';
import { useEffect, useState } from 'react';

function Search({searchResults}){
    const [filteredResults, setFilteredResults] = useState([...searchResults])

    useEffect(()=>{
        setFilteredResults([...searchResults])
    }, [searchResults]);
    return(
        <>
            
            <section className='search-box'>
                <div className='r-container-filter'>
                    <SearchResults resultsCopy={filteredResults} results={searchResults} filter={setFilteredResults} />
                </div>
            </section>
        </>
        
    );
}

export default Search;

