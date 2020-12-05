import React from 'react';

const Menu = (props) => {

    const shelfMap = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read',
        none: 'None'
    }

    const {shelfID, book, handleShelfChangeForBook} = props;

    const handleChange = (book) => {
        return (event) => {
            if (shelfMap[event.target.value]) {
                handleShelfChangeForBook(book, event.target.value)
            }
        }
    }

    return (
        <div className="book-shelf-changer">
            <select value={shelfID} onChange={handleChange(book)}>
                <option value="move" disabled>Move to...</option>
                {
                    Object.keys(shelfMap).map((shelf) => {
                        if (shelf === shelfID) {
                            return <option key={shelf} value={shelf}>&#10003;{shelfMap[shelf]}</option>
                        }
                        return <option key={shelf} value={shelf}>{shelfMap[shelf]}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Menu;