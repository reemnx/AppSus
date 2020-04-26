import { eventBus } from '../../../services/eventBusService.js';

export default function EmailPreview(props) {

    function onReadToggle(id) {
        eventBus.emit('read-toggle', id);
    }

    function onStarredToggle(id) {
        eventBus.emit('star-toggle', id);
    }

    return (
        <tr className={!props.email.isRead ? 'e-unread' : 'e-read'}>
            <td className="e-email-buttons flex align-center">
                <h3 className={props.email.isStarred ? 'e-starred-btn' : 'e-not-starred-btn'} onClick={() => onStarredToggle(props.email.id)} ></h3>
                <h3 className={props.email.isStarred ? 'e-read-btn' : 'e-unread-btn'} onClick={() => onReadToggle(props.email.id)}></h3>
            </td>
            <td className="e-email-address">{props.email.address}</td>
            <td className="e-email-subject">{props.email.subject}</td>
            <td className="e-email-body">{props.email.body}</td>
            <td className="e-email-date">{moment(props.email.sentAt).format('ll')}</td>
        </tr>
    )
}