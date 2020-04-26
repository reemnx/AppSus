import emailService from '../services/emailService.js';
import EmailList from '../cmps/EmailList.jsx';


export default class EmailApp extends React.Component {
    state = {
        currentLabel: 'income',
        emails: null,
    }

    componentDidMount() {
        this.loadEmails();
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


    render() {
        const { emails } = this.state;

        return (
            <div className="e-main-container flex">
                <div className="e-labels-container flex column">
                    <button className="e-new-mail">Compose</button>
                    <li onClick={() => this.changeLabel('income')}>Inbox</li>
                    <li onClick={() => this.changeLabel('starred')}>Starred</li>
                    <li onClick={() => this.changeLabel('sent')}>Sent</li>
                    <li onClick={() => this.changeLabel('drafts')}>Drafts</li>
                </div>
                {!emails ? <h2>Loading...</h2> : <EmailList emails={emails} />}
            </div>
        )
    }
}