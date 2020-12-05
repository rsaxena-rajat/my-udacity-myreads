import React from 'react'
import Book from '../book/book'

const SearchResults = (props) => {
    const {results, bookShelfMap, handleShelfChangeForBook} = props;

    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {results.map((book) => (
                    <li key={book.id}>
                        <Book shelfID={bookShelfMap[book.id] || 'none'} bookDetails={book} handleShelfChangeForBook={handleShelfChangeForBook}/>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default SearchResults;