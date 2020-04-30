const { Route, Switch, NavLink } = ReactRouterDOM;
import MainMenu from '../../../cmps/MainMenu.jsx';
import emailService from '../services/emailService.js';
import EmailList from '../cmps/EmailList.jsx';
import EmailCompose from '../cmps/EmailCompose.jsx';
import EmailDetails from '../cmps/EmailDetails.jsx';
import EmailStatus from '../cmps/EmailStatus.jsx';
import EmailFilter from '../cmps/EmailFilter.jsx';
import UserMsg from '../cmps/UserMsg.jsx';
import { eventBus } from '../../../services/eventBusService.js';

export default class EmailApp extends React.Component {
    state = {
        search: '',
        emails: null,
        composeMail: false,
        onlyUnread: false,
        unreadEmails: null
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);    
        const subject = query.get('title');
        const body = query.get('content');
        if(subject || body) this.onComposeMail()


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
        eventBus.on('reply-compose', () => {
            this.onComposeMail();
        })
    }

    handleChange = ({ target }) => {
        this.setState({ search: target.value });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.label !== this.props.match.params.label) {
            this.loadEmails()
        }
    }

    loadEmails() {
        emailService.query(this.props.match.params.label || 'income')
            .then(res => {
                this.setState({ emails: res.mails, unreadEmails: res.unreadCnt });
            })
    }

    onComposeMail() {
        this.setState({ composeMail: true })
    }

    closeMailCompose = () => {
        this.setState({ composeMail: false })
    }

    onSentMail = (mail, event) => {
        event.preventDefault();
        emailService.sentMail(mail)
            .then(res => {
                eventBus.emit('show-msg', res);
                this.loadEmails();
            })
            .catch(res => eventBus.emit('show-msg', res))
        this.closeMailCompose();
    }

    onDraftMail = (mail) => {
        emailService.draftMail(mail)
            .then(res => {
                eventBus.emit('show-msg', res);
                this.loadEmails();
            })
            .catch(res => eventBus.emit('show-msg', res))
    }

    onlyUnreadToggle = () => {
        this.setState(prevState => ({ onlyUnread: !prevState.onlyUnread }));
    }

    onSortBy = (val) => {
        emailService.sortBy(val)
            .then(this.loadEmails());
    }

    toggleLabelsMenu= () =>{
        document.querySelector('.e-labels-container').classList.toggle('e-toggle-menu');
    }

    render() {
        const { emails, composeMail, search, onlyUnread, unreadEmails } = this.state;
        const { pathname } = this.props.history.location;

        return (
            <div className="e-main-container flex column">
                <header className="e-header">
                    <div className="e-nav-container flex space-between align-center">
                        <h2 className="e-logo">Email</h2>
                        <input className="e-Search-mails" placeholder="Search" onChange={this.handleChange} />
                        <MainMenu classList="e-main-menu" />
                    </div>
                </header>
                <main className="flex">
                    <img className="e-lable-menu-btn" onClick={()=>this.toggleLabelsMenu()}></img>
                    <div className="e-labels-container flex column">
                        <button className="flex justify-center align-center e-new-mail" onClick={() => {this.onComposeMail() , this.toggleLabelsMenu()}}>
                            <span>Compose</span></button>
                        <NavLink activeClassName="e-active-label" to="/email/label/income" onClick={()=>this.toggleLabelsMenu()}><span>Inbox</span> <span className="e-unread-counter">{unreadEmails ? unreadEmails : ''}</span></NavLink>
                        <NavLink activeClassName="e-active-label" to="/email/label/starred" onClick={()=>this.toggleLabelsMenu()}><span>Starred</span></NavLink>
                        <NavLink activeClassName="e-active-label" to="/email/label/sent" onClick={()=>this.toggleLabelsMenu()}><span>Sent</span></NavLink>
                        <NavLink activeClassName="e-active-label" to="/email/label/drafts" onClick={()=>this.toggleLabelsMenu()}><span>Drafts</span></NavLink>
                        <EmailStatus emails={emails} />
                    </div>
                    <div className="e-emails-container">
                        {(pathname.includes('label') || pathname === '/email') && <EmailFilter onlyUnreadToggle={this.onlyUnreadToggle} onSortBy={this.onSortBy} />}
                        {emails && <Switch>
                            <Route exact component={EmailDetails} path="/email/:emailId" />
                            <Route component={() =>
                                <EmailList history={this.props.history} emails={emails} search={search} onlyUnread={onlyUnread} />} path="/email" />
                        </Switch>}
                    </div>
                    {composeMail &&
                        <EmailCompose history={this.props.history} closeMailCompose={this.closeMailCompose} onSentMail={this.onSentMail} onDraftMail={this.onDraftMail} composeMail={composeMail} />}
                    <UserMsg />
                </main>
            </div>
        )
    }
}

