import {eventBus} from '../../../services/eventBusService.js';

export default function EmailPreview(props) {

    function onReadToggle(id){
        eventBus.emit('read-toggle', id);
    }

    return (
        <tr className={!props.email.isRead ? 'e-unread' : 'e-read'}>
            <td className="e-email-buttons flex">
                <h3>❤</h3>
                <h3 onClick={() => onReadToggle(props.email.id)}>✉</h3>
            </td>
            <td className="e-email-subject">{props.email.subject}</td>
            <td className="e-email-body">{props.email.body}</td>
            <td className="e-email-date">{moment(props.email.sentAt).format('ll')}</td>
        </tr>
    )
}