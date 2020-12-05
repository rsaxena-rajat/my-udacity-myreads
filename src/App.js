import React from 'react'
import {Link, Route} from 'react-router-dom'
import {cloneDeep, unset} from 'lodash'

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
    this.setState({
      shelves,
      bookShelfMap
    })
  }

  handleShelfChangeForBook = async (book, shelf) => {
    const currentShelf = this.state.bookShelfMap[book.id]
    
    const newState = cloneDeep(this.state)

    // Remove the book from current shelf
    if (newState.shelves[currentShelf]) {
      newState.shelves[currentShelf] = newState.shelves[currentShelf].filter((currBook) => currBook.id !== book.id)
    }

    // Add the book to new shelf
    if (newState.shelves[shelf]) {
      newState.shelves[shelf].push(book)
      newState.bookShelfMap[book.id] = shelf
    } else {
      unset(newState.bookShelfMap, book.id)
    }

    this.setState(newState)

    BooksAPI.update({id: book.id}, shelf);
  }

  componentDidMount() {
    this.refreshShelves()
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
              <Link to='/search'/>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
