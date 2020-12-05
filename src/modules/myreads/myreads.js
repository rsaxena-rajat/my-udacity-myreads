import React from 'react'
import {Link} from 'react-router-dom'

import Shelf from '../shelf/shelf'

const MyReads = (props) => {

    const {shelves, handleShelfChangeForBook} = props;

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                <Shelf title='Currently Reading' shelfID='currentlyReading' books={shelves.currentlyReading} handleShelfChangeForBook={handleShelfChangeForBook}/>
                <Shelf title='Want to Read' shelfID='wantToRead' books={shelves.wantToRead} handleShelfChangeForBook={handleShelfChangeForBook}/>
                <Shelf title='Read' shelfID='read' books={shelves.read} handleShelfChangeForBook={handleShelfChangeForBook}/>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'/>
            </div>
        </div>
    )
}

export default MyReads;
