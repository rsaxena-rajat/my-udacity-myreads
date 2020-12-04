import React from 'react'
import {Link, Route} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'

import Search from './modules/search/search'
import Shelf from './modules/shelf/shelf'

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    bookShelfMap: {}
  }

  refreshShelves = async () => {
    const books = await BooksAPI.getAll();
    const bookShelfMap = {};
    const shelves = books.reduce((initial, book) => {
      initial[book.shelf].push(book);
      bookShelfMap[book.id] = book.shelf;
      return initial;
    }, {
      currentlyReading: [],
      wantToRead: [],
      read: []
    })
    this.setState((current) => ({
      ...current,
      shelves,
      bookShelfMap
    }))
  }

  handleShelfChangeForBook = async (bookID, shelf) => {
    await BooksAPI.update({id: bookID}, shelf);
    // At this point, we could have shuffled the state directly.
    // But the backend could have been updated from a different browser/device too.
    // Hence, it may be better to reset all shelves
    this.refreshShelves();
  }

  async componentDidMount() {
    this.refreshShelves();
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search onCloseClick={this.handlePageChange} bookShelfMap={this.state.bookShelfMap} handleShelfChangeForBook={this.handleShelfChangeForBook} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title='Currently Reading' shelfID='currentlyReading' books={this.state.shelves.currentlyReading} handleShelfChangeForBook={this.handleShelfChangeForBook}/>
                <Shelf title='Want to Read' shelfID='wantToRead' books={this.state.shelves.wantToRead} handleShelfChangeForBook={this.handleShelfChangeForBook}/>
                <Shelf title='Read' shelfID='read' books={this.state.shelves.read} handleShelfChangeForBook={this.handleShelfChangeForBook}/>
              </div>
            </div>
            <div className="open-search">
              <Link className='open-search' to='/search'/>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
