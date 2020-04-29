import { eventBus } from '../../../services/eventBusService.js';
export default class EmailCompose extends React.Component {
    state = {
        mail: {
            address: '',
            subject: '',
            body: '',
            sentAt: ''
        }
    }

    componentDidMount() {
        const recipient = this.props.history.location.state;
        this.setState({ mail: { address: recipient ? recipient.address : '' } })
    }

    componentWillUnmount() {
        const mail = this.state.mail;
        if (mail.address || mail.subject || mail.body || mail.sentAt) this.props.onDraftMail(mail);
        this.props.history.location.state = undefined;
    }

    onHandleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => ({ mail: { ...prevState.mail, [field]: value, sentAt: Date.now() } }))
    }

    render() {
        return (
            <div className="e-compose-mail">
                <button onClick={() => this.props.closeMailCompose()}>X</button>
                <form className="flex column" onSubmit={() => this.props.onSentMail(this.state.mail, event)}>
                    <input type="email" value={this.state.mail.address} placeholder="To" name="address" onChange={this.onHandleChange} />
                    <input type="text" placeholder="Subject" name="subject" onChange={this.onHandleChange} />
                    <textarea name="body" onChange={this.onHandleChange} />
                    <button>Sent</button>
                </form>
            </div>
        )
    }
}