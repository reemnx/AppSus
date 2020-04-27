import emailService from '../services/emailService.js';
import EmailList from '../cmps/EmailList.jsx';
import EmailCompose from '../cmps/EmailCompose.jsx';
import EmailDetails from '../cmps/EmailDetails.jsx';
import EmailStatus from '../cmps/EmailStatus.jsx';
import EmailFilter from '../cmps/EmailFilter.jsx';
import { eventBus } from '../../../services/eventBusService.js';


export default class EmailApp extends React.Component {
    state = {
        currentLabel: 'income',
        showStarred: false,
        emails: null,
        composeMail: false,
        isExpanded: false,
        currEmail: null,
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
        eventBus.on('remove-email', (id) => {
            emailService.removeEmail(id)
                .then(this.loadEmails());
        })
        eventBus.on('expandMail', (data) => {
            this.setState({ isExpanded: data.isExpanded, currEmail: data.currEmail });
        })
    }

    componentWillUnmount() {

    }

    loadEmails() {
        emailService.getEmails(this.state.currentLabel)
            .then(res => {
                this.setState({ emails: res });
            })
    }

    changeLabel(label) {
        this.state.currentLabel = label;
        this.state.isExpanded = false;
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
        const { emails, composeMail, isExpanded, currEmail } = this.state;

        return (
            <div className="e-main-container flex">
                <div className="e-labels-container flex column">
                    <button className="e-new-mail" onClick={() => this.onComposeMail()}>Compose</button>
                    <li onClick={() => this.changeLabel('income')}>Inbox</li>
                    <li onClick={() => this.changeLabel('starred')}>Starred</li>
                    <li onClick={() => this.changeLabel('sent')}>Sent</li>
                    <li onClick={() => this.changeLabel('drafts')}>Drafts</li>
                    <EmailStatus emails={emails} />
                </div>
                <div className="e-emails-container">
                    <EmailFilter />
                    {!emails ? <h2>Loading...</h2> : (!isExpanded ? <EmailList emails={emails} /> : <EmailDetails currEmail={currEmail} />)}
                    {composeMail && <EmailCompose closeMailCompose={this.closeMailCompose} onSentMail={this.onSentMail} onDraftMail={this.onDraftMail} />}
                </div>
            </div>
        )
    }
}