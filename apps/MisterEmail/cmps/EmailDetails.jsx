import GetTime from './GetTime.jsx'

export default class EmailDetails extends React.Component {


    render() {
        const { currEmail } = this.props
        return (
            <div className="e-email-details flex column">
                <h2>{currEmail.subject}</h2>
                <div className="flex space-between">
                    <h3>{currEmail.address}</h3>
                    <GetTime sentAt={currEmail.sentAt}/>
                </div>
                <p>{currEmail.body}</p>
            </div>
        )
    }
}