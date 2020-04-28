import EmailPreview from '../cmps/EmailPreview.jsx';

export default function EmailList(props) {

    let emailsToShow;
    const search = props.search.toLowerCase();

    if (!props.onlyUnread) emailsToShow = props.emails.filter(email => (email.address.toLowerCase().includes(search) || email.subject.toLowerCase().includes(search) || email.body.toLowerCase().includes(search)));
    else emailsToShow = props.emails.filter(email => (!email.isRead &&
        (email.address.toLowerCase().includes(search) || email.subject.toLowerCase().includes(search) || email.body.toLowerCase().includes(search))));

    return (
        <table className="e-email-list-table no-select">
            <tbody className="e-email-list-container">
                {emailsToShow.map(email =>
                    <EmailPreview history={props.history} key={email.id} email={email} >
                    </EmailPreview>
                )}
            </tbody>
        </table>
    )
}