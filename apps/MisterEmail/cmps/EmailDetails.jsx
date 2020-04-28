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


    onStarredToggle = (event, id) => {
        event.stopPropagation();
        eventBus.emit('star-toggle', id);
    }

    onRemoveEmail = (event, id) => {
        event.stopPropagation();
        eventBus.emit('remove-email', id)
    }


    render() {
        const { currEmail } = this.state;
        if (!currEmail) return <h2>Loading...</h2>
        return (
            <div className="e-email-details flex column">
                <div className="e-email-buttons flex align-center">
                    <h3 className={currEmail.isStarred ? 'e-starred-btn' : 'e-not-starred-btn'} onClick={(e) => this.onStarredToggle(e, currEmail.id)} ></h3>
                    {/* <h3 className="e-read-btn" onClick={(e) => onReadToggle(e, currEmail.id)}></h3> */}
                    <h3 className="e-remove-btn" onClick={(e) => this.onRemoveEmail(e, currEmail.id)}>🗑</h3>
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