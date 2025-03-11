import './styles.css';
import './Search.css';

import Filter from './components/Filter';
import SearchResults from './components/SearchResults';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar'
import { SearchContextProvider } from './contexts/SearchContext';
function Search(){
   
    return(
        <SearchContextProvider>
            <SearchBar/>
            <section className='search-box'>
                <div className='r-container-filter'>
                    <Filter/>
                    <SearchResults/>
                </div>
            </section>
        </SearchContextProvider>
        
    );
}

export default Search;

