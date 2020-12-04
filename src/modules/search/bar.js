import React from 'react'

const SearchBar = (props) => {
    return (
        <div className="search-books-bar">
            <button className="close-search" onClick={() => props.onCloseClick(false)}>Close</button>
                <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={props.value} onChange={(event) => props.handleKeywordChange(event.target.value)}/>
            </div>
        </div>
    )
}

export default SearchBar;