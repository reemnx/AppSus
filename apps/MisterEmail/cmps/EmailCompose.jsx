export default class EmailCompose extends React.Component {
    state = {
        mail: {
            address: '',
            subject: '',
            body: '',
            sentAt: ''
        },
        replyTag: false,
        isDraft: false
    }

    componentDidMount() {
        const recipient = this.props.history.location.state;
        if (recipient) this.setState(prevState => ({ mail: { ...prevState.mail , address: recipient.address }, replyTag: true }))
        else {
            const query = new URLSearchParams(this.props.history.location.search);
            const subject = query.get('title');
            const body = query.get('content');
            this.setState({ mail:{subject: subject || '', body: body || '' }})
        }
    }

    componentWillUnmount() {
        const { mail, isDraft: isDraft } = this.state;
        this.props.history.location.state = undefined;
        if ((mail.address || mail.subject || mail.body) && isDraft) this.props.onDraftMail(mail);
    }

    onHandleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => ({ mail: { ...prevState.mail, [field]: value, sentAt: Date.now() } }))
    }

    onCloseMailCompose() {
        this.state.isDraft = true;
        this.props.closeMailCompose();
    }

    render() {
        const { mail } = this.state
        return (
            <div className="e-compose-mail">
                <div className="e-compose-title flex space-between">
                    <h3>New Message</h3>
                    <button className="e-close-compose-btn" onClick={() => this.onCloseMailCompose()}>X</button>
                </div>
                <form className="flex column" onSubmit={() => this.props.onSentMail(this.state.mail, event)} >
                    <div className="e-compose-address-wrap flex align-center">
                        {this.state.replyTag && <div className="e-reply-tag">Re:</div>}
                        <input required type="email" value={mail.address} placeholder="To" name="address" onChange={this.onHandleChange} />
                    </div>
                    <input type="text" value={mail.subject} placeholder="Subject" name="subject" onChange={this.onHandleChange} />
                    <textarea name="body" value={mail.body} onChange={this.onHandleChange} />
                    <button className="e-compose-sent-btn">Sent</button>
                </form>
            </div>
        )
    }
}