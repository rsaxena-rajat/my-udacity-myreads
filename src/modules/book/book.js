import React from 'react';
import Menu from './menu';

const Book = (props) => {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.bookDetails.imageLinks.thumbnail}")` }}></div>
                <Menu handleShelfChangeForBook={props.handleShelfChangeForBook} book={props.bookDetails} shelfID={props.shelfID} />
            </div>
            <div className="book-title">{props.bookDetails.title}</div>
            <div className="book-authors">{props.bookDetails.authors}</div>
        </div>
    )
}

export default Book;