import emailService from '../services/emailService.js';
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


    render() {
        const { currEmail } = this.state;
        if (!currEmail) return <h2>Loading...</h2>
        return (
            <div className="e-email-details flex column">
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