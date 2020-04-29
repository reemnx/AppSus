import currencySymb from './CurrencyToSymb.jsx'
const { Link } = ReactRouterDOM
export default function BookPreview(props) {
    const { book } = props


    return (
        <Link to={`/missbooks/books/${book.id}`}>
            <article className="book-preview">
                <img src={book.thumbnail} alt="" />
                <p>{book.title}</p>
                <p>{currencySymb(book.listPrice.currencyCode)}{book.listPrice.amount} </p>
            </article>
        </Link>
    )
}