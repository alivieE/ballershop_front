import React, { createContext, useContext, useState} from 'react'

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearchTerm = (term) => {
        setSearchTerm(term)
    };

    return (
        <SearchContext.Provider value = {{searchTerm, updateSearchTerm}}>
            {children}
        </SearchContext.Provider>
    )
}

