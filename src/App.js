import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Search from './modules/search/search'
import Shelf from './modules/shelf/shelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    bookShelfMap: {}
  }

  handlePageChange = (showSearchPage) => {
    this.setState({showSearchPage})
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
        {this.state.showSearchPage ? (
          <Search onCloseClick={this.handlePageChange} bookShelfMap={this.state.bookShelfMap} handleShelfChangeForBook={this.handleShelfChangeForBook} />
        ) : (
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
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
