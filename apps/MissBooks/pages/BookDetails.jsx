import bookService from '../services/bookService.js'
import currencySymb from '../cmps/CurrencyToSymb.jsx'
import LongTxt from '../cmps/LongTxt.jsx'
import ReviewBook from '../cmps/ReviewBook.jsx'
const { Link } = ReactRouterDOM



export default class BookDetails extends React.Component {

    state = {
        book: null,
        isLongTxtShown: false,
        showReviews: false
    }


    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.theBookId !== this.props.match.params.theBookId) {
            this.state.showReviews = false;
            this.loadBook()
        }
    }

    loadBook() {
        const id = this.props.match.params.theBookId
        bookService.getById(id)
            .then(book => {
                this.setState({ book })
            })
        this.prevNext = bookService.getPrevNextBooks(id)
    }



    readingTime(pageCount) {
        if (pageCount > 500) return '[ Long reading ]';
        if (pageCount > 200) return '[ Decent Reading ]';
        if (pageCount < 100) return '[ Light Reading ]';
    }

    bookAge(year) {
        let age = new Date().getFullYear() - year;
        if (age > 10) return '[ Veteran Book ]';
        if (age < 1) return '[ New! ]';
    }

    getClassByPrice(price) {
        if (price > 150) return 'red';
        if (price < 20) return 'green';
    }

    checkDescription() {
        if (this.props.book.description.length > 100) this.setState({ isLongTxtShown: true });
    }

    toggleDescription = () => {
        this.setState(prevState => ({ isLongTxtShown: !prevState.isLongTxtShown }));
    }

    toggleReview = () => {
        this.setState(prevState => ({ showReviews: !prevState.showReviews }));
    }

    loadReviews = () => {
        const id = this.props.match.params.theBookId;
        return bookService.getReviews(id)
    }

    onSaveReview = (review, event) => {
        event.preventDefault();
        const id = this.props.match.params.theBookId;
        bookService.saveReview(id, review);
    }

    onRemoveReview = (reviewId) => {
        const bookId = this.props.match.params.theBookId;
        bookService.removeReview(bookId, reviewId);
    }



    render() {
        const { book, isLongTxtShown, showReviews } = this.state
        const loading = <h3>Loading...</h3>
        return ((!book) ? loading :
            <div className="book-detail-container">
                <Link className="prev-book-btn" to={`/missbooks/books/${this.prevNext.prev}`}/>
                <div className="book-details">
                    <h2>{book.title}</h2>
                    <img src={book.thumbnail} />
                    <h3 className={this.getClassByPrice(book.listPrice.amount)}>Price: {currencySymb(book.listPrice.currencyCode)}{book.listPrice.amount}</h3>
                    {book.listPrice.isOnSale && <h3 className="on-sale green">ON SALE!</h3>}
                    <div className="book-info">
                        <h3>{this.readingTime(book.pageCount)}</h3> 
                        <h3>{this.bookAge(book.publishedDate)}</h3>
                    </div>
                    <LongTxt text={book.description} isLongTxtShown={isLongTxtShown} toggleDescription={this.toggleDescription} />
                    <button className="review-btn" onClick={() => this.toggleReview()}>Reviews</button>
                    {showReviews && <ReviewBook onSaveReview={this.onSaveReview} toggleReview={this.toggleReview} reviews={book.reviews} loadReviews={this.loadReviews} removeCurrReview={this.onRemoveReview} />}
                </div>
                <Link className="next-book-btn" to={`/missbooks/books/${this.prevNext.next}`}/>
            </div>)

    }
}