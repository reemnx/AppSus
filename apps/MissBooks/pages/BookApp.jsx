import bookService from '../services/bookService.js'
import BookList from '../cmps/BookList.jsx'
import BookFilter from '../cmps/BookFilter.jsx'
import BookAdd from '../cmps/BookAdd.jsx'


export default class BookApp extends React.Component {

    state = {
        books: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadBooks())
    }


    onGetGoogleBooks = (searchKey) => {
        return bookService.getGoogleBooksByKey(searchKey)
            .then(res => res)
            .catch(res => res)
    }

    addBook = (book) => {
        return bookService.addGoogleBook(book)
        .then(res => res)
    }

    render() {
        return (
            <section className="main-container">
                <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                <BookAdd onGetGoogleBooks={this.onGetGoogleBooks} addBook={this.addBook} loadBooks={this.loadBooks}/>
                {this.state.books && <BookList books={this.state.books} />}
            </section >
        )
    }
}