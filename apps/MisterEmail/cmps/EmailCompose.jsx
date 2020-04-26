export default class EmailCompose extends React.Component {
    state ={
        
    }

    onSentMail(){

    }

    render() {
        return (
            <div className="e-compose-mail">
                <form className="flex column" onSubmit={() => this.onSentMail()}>
                    <input type="email" placeholder="To" />
                    <input type="text" placeholder="Subject" />
                    <textarea></textarea >
                    <button>Sent</button>
                </form>
            </div>
        )
    }
}