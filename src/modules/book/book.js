import React from 'react';
import Menu from './menu';

const Book = (props) => {
    const {bookDetails, shelfID, handleShelfChangeForBook} = props;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookDetails.imageLinks.thumbnail}")` }}></div>
                <Menu handleShelfChangeForBook={handleShelfChangeForBook} book={bookDetails} shelfID={shelfID} />
            </div>
            <div className="book-title">{bookDetails.title}</div>
            <div className="book-authors">{bookDetails.authors}</div>
        </div>
    )
}

export default Book;