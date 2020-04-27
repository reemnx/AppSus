export default function EmailStatus(props) {
    const eStatus = readStatus();

    function readStatus() {
        if (props.emails) {
            const totalMails = props.emails.length;
            let cnt = 0;
            props.emails.forEach(email => {
                if (email.isRead) cnt++;
            });
            if(!cnt) return '0%';
            else return ((cnt / totalMails) * 100).toFixed(2) + '%';
        }
    }

    return (
        <div className="e-read-status-container">
            <div className="e-read-status-bar" style={{ width: eStatus }} >
                <span>{eStatus}</span>
            </div>
        </div>
    )
}