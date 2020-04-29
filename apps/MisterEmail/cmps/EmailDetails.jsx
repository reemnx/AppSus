import emailService from '../services/emailService.js';
import { eventBus } from '../../../services/eventBusService.js';
import GetTime from './GetTime.jsx';


export default class EmailDetails extends React.Component {

    state = {
        currEmail: null
    }


    componentDidMount() {
        const emailId = this.props.match.params.emailId;
        emailService.readMail(emailId);
        emailService.getEmailById(emailId)
            .then(res => this.setState({ currEmail: res }))
    }


    onStarredToggle = (id) => {
        event.stopPropagation();
        eventBus.emit('star-toggle', id);
    }

    onRemoveEmail = (id) => {
        event.stopPropagation();
        eventBus.emit('remove-email', id);
        this.props.history.push('/email');
    }

    onRepalyEmail(address) {
        this.props.history.location.state = {address};
        eventBus.emit('reply-compose', address);
    }


    render() {
        const { currEmail } = this.state;
        if (!currEmail) return <h2>Loading...</h2>
        return (
            <div className="e-email-details flex column">
                <div className="e-detail-email-buttons e-email-buttons flex align-center">
                    <h3 className={currEmail.isStarred ? 'e-starred-btn' : 'e-not-starred-btn'} onClick={() => this.onStarredToggle(currEmail.id)} ></h3>
                    <h3 className="e-repaly-btn" onClick={() => this.onRepalyEmail(currEmail.address)}>↩</h3>
                    <h3 className="e-remove-btn" onClick={() => this.onRemoveEmail(currEmail.id)}>🗑</h3>
                </div>
                <h2>{currEmail.subject}</h2>
                <div className="flex space-between">
                    <h3>{currEmail.address}</h3>
                    <GetTime sentAt={currEmail.sentAt} />
                </div>
                <p>{currEmail.body}</p>
            </div>
        )
    }
}