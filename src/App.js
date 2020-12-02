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
    }
  }

  handlePageChange = (showSearchPage) => {
    this.setState({showSearchPage})
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    const shelves = books.reduce((initial, book) => {
      initial[book.shelf].push(book);
      return initial;
    }, {
      currentlyReading: [],
      wantToRead: [],
      read: []
    })
    this.setState((current) => ({
      ...current,
      shelves
    }))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search onCloseClick={this.handlePageChange}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title='Currently Reading' books={this.state.shelves.currentlyReading}/>
                <Shelf title='Want to Read' books={this.state.shelves.wantToRead}/>
                <Shelf title='Read' books={this.state.shelves.read}/>
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
