export default function EmailPreview(props) {
    return (
        <tr className={props.email.isRead ? 'unread' : ''}>
            <td>{props.email.subject}</td>
            <td>{props.email.body}</td>
            <td>{moment(props.email.sentAt).format('ll')}</td>
        </tr>
    )
}