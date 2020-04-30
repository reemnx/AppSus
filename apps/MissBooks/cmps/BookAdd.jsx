import { eventBus } from '../services/eventBusService.js'
import currencySymb from './CurrencyToSymb.jsx'

export default class BookAdd extends React.Component {

    state = {
        googleBooks: null,
    }

    getGoogleBookList = ({ target }) => {
        let searchKey = target.value;
        if (!searchKey) this.setState({ googleBooks: null });
        else this.props.onGetGoogleBooks(searchKey)
            .then(res => this.setState({ googleBooks: res }))
            .catch(res => console.log(res)
    }

    onAddBook(book) {
        return this.props.addBook(book)
            .then(res => {
                this.props.loadBooks()
                eventBus.emit('show-msg', { msg: { txt: res }, book: { ...book }, type: 'success' })
            })
            .catch(res => {
                eventBus.emit('show-msg', { msg: { txt: res }, type: 'error' })
            })
    }

    render() {

        return (
            <div className="add-book">
                <input type="search" placeholder="Look for other books" onChange={this.getGoogleBookList}></input>
                {this.state.googleBooks && <div className="google-book-list">{this.state.googleBooks.map((book, idx) => {
                    return <div className="google-book" key={idx}>
                        <img src={book.thumbnail} />
                        <h3>{book.title}</h3>
                        <h3>{currencySymb(book.listPrice.currencyCode)}{book.listPrice.amount}</h3>
                        <button onClick={() => this.onAddBook(book)}>Add</button>
                    </div>
                })}</div>}

            </div>
        )
    }
}