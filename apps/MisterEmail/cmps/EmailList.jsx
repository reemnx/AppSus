import EmailPreview from '../cmps/EmailPreview.jsx'

export default function EmailList(props) {
    console.log(props.emails)
    return (
        <table>
            <tbody>
                {props.emails.map(email => <EmailPreview email={email} key={email.id}/>)}
            </tbody>
        </table>
    )
}