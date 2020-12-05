import React from 'react';

const Menu = (props) => {

    const shelfMap = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read',
        none: 'None'
    }

    const handleChange = (book) => {
        return (event) => {
            if (shelfMap[event.target.value]) {
                props.handleShelfChangeForBook(book, event.target.value)
            }
        }
    }

    return (
        <div className="book-shelf-changer">
            <select value={props.shelfID} onChange={handleChange(props.book)}>
                <option value="move" disabled>Move to...</option>
                {
                    Object.keys(shelfMap).map((shelf) => {
                        if (shelf === props.shelfID) {
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