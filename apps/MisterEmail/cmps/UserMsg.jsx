import { eventBus } from '../../../services/eventBusService.js';
export default class UserMsg extends React.Component {

    state = {
        msg: null,
        title: null,
        type: null
    }

    componentDidMount() {
        eventBus.on('show-msg', (data) => {
            this.setState({ msg: data.msg, title: data.content, type: data.type })
            setTimeout(() => {
                this.closeModal()
            }, 3000)
        })
    }

    closeModal() {
        this.setState({ msg: null, title: null })
    }

    render() {
        const { msg, title, type } = this.state;
        return (
            (!msg) ? '' : <div className={`e-msg-modal ${type}`} >
                <button className="close-modal-btn" onClick={() => this.closeModal()}>X</button>
                <h2>{msg}</h2>
                {title && <h2>'{title}'</h2>}
            </div>
        )
    }
}