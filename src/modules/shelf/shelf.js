import React from 'react'
import Book from '../book/book'

const Shelf = (props) => {
    const {title, books, shelfID, handleShelfChangeForBook} = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map((book) => (
                            <li key={book.id}>
                                <Book shelfID={shelfID} bookDetails={book} handleShelfChangeForBook={handleShelfChangeForBook}/>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default Shelf