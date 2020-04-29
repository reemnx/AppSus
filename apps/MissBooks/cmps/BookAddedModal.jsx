import { eventBus } from '../services/eventBusService.js'

export default class BookAddedModal extends React.Component {
    state = {
        msg: null,
        book: null,
        type: null
    }

    componentDidMount() {
        eventBus.on('show-msg', (data) => {
            this.setState({ msg: data.msg, book: data.book, type: data.type })
            setTimeout(() => {
                this.setState({ msg: null, book: null })
            }, 3000)
        })
    }

    render() {
        const { msg, book, type } = this.state
        return (
            (!msg) ? '' : <div className={`book-added-modal ${type}`} >
                <button className="close-modal-btn" onClick={() => this.setState({ msg: null, book: null })}>X</button>
                <h2>{msg.txt}</h2>
                {book && <a href={`/#/books/${book.id}`}>Check it Out</a>}
            </div>
        )
    }
}