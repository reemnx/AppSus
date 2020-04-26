import emailService from '../services/emailService.js';
import EmailList from '../cmps/EmailList.jsx';
import EmailCompose from '../cmps/EmailCompose.jsx';
import { eventBus } from '../../../services/eventBusService.js';


export default class EmailApp extends React.Component {
    state = {
        currentLabel: 'income',
        showStarred: false,
        emails: null,
        composeMail: false
    }

    componentDidMount() {
        this.loadEmails();
        eventBus.on('read-toggle', (id) => {
            emailService.readToggle(id)
                .then(this.loadEmails());
        })
        eventBus.on('star-toggle', (id) => {
            emailService.starToggle(id)
                .then(this.loadEmails());
        })
    }

    componentDidUpdate() {

    }

    loadEmails() {
        emailService.getEmails(this.state.currentLabel)
            .then(res => {
                this.setState({ emails: res });
                console.log(this.state);
            })
    }

    changeLabel(label) {
        this.state.currentLabel = label;
        this.loadEmails();
    }

    onComposeMail() {
        this.setState({ composeMail: true })
    }

    onSentMail = (mail, event) => {
        event.preventDefault();
        emailService.sentMail(mail)
            .then(this.loadEmails());
    }

    onDraftMail = (mail) => {
        console.log(mail)
        emailService.draftMail(mail)
            .then(this.loadEmails());
    }


    closeMailCompose = () => {
        this.setState({ composeMail: false })
    }


    render() {
        const { emails, composeMail } = this.state;

        return (
            <div className="e-main-container flex">
                <div className="e-labels-container flex column">
                    <button className="e-new-mail" onClick={() => this.onComposeMail()}>Compose</button>
                    <li onClick={() => this.changeLabel('income')}>Inbox</li>
                    <li onClick={() => this.changeLabel('starred')}>Starred</li>
                    <li onClick={() => this.changeLabel('sent')}>Sent</li>
                    <li onClick={() => this.changeLabel('drafts')}>Drafts</li>
                </div>
                {!emails ? <h2>Loading...</h2> : <EmailList emails={emails} />}
                {composeMail && <EmailCompose closeMailCompose={this.closeMailCompose} onSentMail={this.onSentMail} onDraftMail={this.onDraftMail} />}
            </div>
        )
    }
}