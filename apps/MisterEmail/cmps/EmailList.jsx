import EmailPreview from '../cmps/EmailPreview.jsx'

export default function EmailList(props) {
    console.log(props.emails)
    return (
        <table className="e-email-list-table">
            <tbody className="e-email-list-container">
                {props.emails.map(email => <EmailPreview email={email} key={email.id}/>)}
            </tbody>
        </table>
    )
}