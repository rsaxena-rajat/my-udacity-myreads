import React from 'react'
import {Route} from 'react-router-dom'
import {cloneDeep, unset} from 'lodash'

import * as BooksAPI from './BooksAPI'
import './App.css'

import MyReads from './modules/myreads/myreads'
import Search from './modules/search/search'

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
          <MyReads shelves={this.state.shelves} handleShelfChangeForBook={this.handleShelfChangeForBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
