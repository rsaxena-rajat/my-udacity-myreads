import React from 'react'
import Book from '../book/book'

const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        props.books.map((book) => (
                            <li key={book.id}>
                                <Book shelfID={props.shelfID} bookDetails={book} handleShelfChangeForBook={props.handleShelfChangeForBook}/>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default Shelf