import React from 'react'
import {Link} from 'react-router-dom'

const SearchBar = (props) => {
    const {value, handleKeywordChange} = props;
    return (
        <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={value} onChange={(event) => handleKeywordChange(event.target.value)}/>
            </div>
        </div>
    )
}

export default SearchBar;