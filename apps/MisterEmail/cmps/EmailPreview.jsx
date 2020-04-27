import { eventBus } from '../../../services/eventBusService.js';
import GetTime from './GetTime.jsx';
const { Link } = ReactRouterDOM

export default function EmailPreview(props) {

    const onReadToggle = (event, id) => {
        event.stopPropagation();
        eventBus.emit('read-toggle', id);
    }

    const onStarredToggle = (event, id) => {
        event.stopPropagation();
        eventBus.emit('star-toggle', id);
    }

    const onRemoveEmail = (event, id) => {
        event.stopPropagation();
        eventBus.emit('remove-email', id)
    }

    function expandMail(email) {
        const data = { isExpanded: true, currEmail: email };
        eventBus.emit('expandMail', data);
    }

    return (
        <tr className={!props.email.isRead ? 'e-unread' : 'e-read'} onClick={() => expandMail(props.email)}>
            <td className="e-email-buttons flex align-center">
                <h3 className={props.email.isStarred ? 'e-starred-btn' : 'e-not-starred-btn'} onClick={(e) => onStarredToggle(e, props.email.id)} ></h3>
                <h3 className={props.email.isStarred ? 'e-read-btn' : 'e-unread-btn'} onClick={(e) => onReadToggle(e, props.email.id)}></h3>
                <h3 className="e-remove-btn" onClick={(e) => onRemoveEmail(e, props.email.id)}>🗑</h3>
            </td>
            <td className="e-email-address">{props.email.address}</td>
            <td className="e-email-subject">{props.email.subject}</td>
            <td className="e-email-body">{props.email.body}</td>
            <td className="e-email-date"><GetTime sentAt={props.email.sentAt} /></td>
        </tr>
    )
}