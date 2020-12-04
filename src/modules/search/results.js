import React from 'react'
import Book from '../book/book'

const SearchResults = (props) => {
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {props.results.map((book) => (
                    <li key={book.id}>
                        <Book shelfID={props.bookShelfMap[book.id]} bookDetails={book} handleShelfChangeForBook={props.handleShelfChangeForBook}/>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default SearchResults;