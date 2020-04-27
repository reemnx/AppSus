import EmailPreview from '../cmps/EmailPreview.jsx'

export default function EmailList(props) {
    return (
        <table className="e-email-list-table no-select">
            <tbody className="e-email-list-container">
                {props.emails.map(email => <EmailPreview email={email} key={email.id}/>)}
            </tbody>
        </table>
    )
}