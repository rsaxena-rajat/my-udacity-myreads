import React from 'react'
import SearchBar from './bar'
import SearchResults from './results'

const Search = (props) => {
    return (
        <div className="search-books">
            <SearchBar onCloseClick={props.onCloseClick}/>
            <SearchResults />
        </div>
    )
}

export default Search;