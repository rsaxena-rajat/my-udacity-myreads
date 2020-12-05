import React, {Component} from 'react'
import * as BooksAPI from '../../BooksAPI'
import SearchBar from './bar'
import SearchResults from './results'

class Search extends Component {
    state = {
        keyword: '',
        term: '',
        termResults: [],
        results: []
    }

    allowedTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'].reduce((initial, elem) => {
        initial[elem.toLowerCase()] = elem;
        return initial;
    }, {})

    handleKeywordChange = async (value) => {
        const valueLowered = value.toLowerCase();
        // If the value is an allowed term, we need to display term results
        if (this.allowedTerms[valueLowered]) {
            if (this.state.term && (this.state.term === valueLowered)) {
                // We already have results, let's display them - no need to make a call
                this.setState((current) => ({
                    ...current,
                    keyword: value,
                    results: this.state.termResults
                }))
            } else {
                // We need to call the API to get results
                const results = await BooksAPI.search(this.allowedTerms[valueLowered]);
                this.setState({
                    keyword: value,
                    results,
                    term: valueLowered,
                    termResults: results
                })
            }
            return null;
        }
        // If the value contains an allowed term, we filter the term results that we already have
        if (this.state.term && valueLowered.includes(this.state.term)) {
            this.setState((current) => ({
                ...current,
                keyword: value,
                results: current.termResults.filter((res) => res.title.toLowerCase().includes(valueLowered))
            }))
            return null;
        }
        // One may paste a term directly for which we do not have the results
        // For this, may take the largest search term and get the results for it

        const applicableTerm = Object.keys(this.allowedTerms).reduce((initial, term) => {
            if (valueLowered.includes(term) && term.length > initial.length) {
                return term;
            }
            return initial;
        }, '')

        if (applicableTerm.length) {
            // We need to call the API to get results
            const results = await BooksAPI.search(this.allowedTerms[applicableTerm]);
            this.setState({
                keyword: value,
                results: results.filter((res) => res.title.toLowerCase().includes(valueLowered)),
                term: valueLowered,
                termResults: results
            })
        } else {
            this.setState({
                term: '',
                termResults: [],
                keyword: value,
                results: []
            })
        }
    }

    render () {
        const {keyword, results} = this.state;
        const {onCloseClick, bookShelfMap, handleShelfChangeForBook} = this.props;
        return (
            <div className="search-books">
                <SearchBar onCloseClick={onCloseClick} handleKeywordChange={this.handleKeywordChange} value={keyword} />
                <SearchResults results={results} bookShelfMap={bookShelfMap} handleShelfChangeForBook={handleShelfChangeForBook} />
            </div>
        )
    }
}

export default Search;