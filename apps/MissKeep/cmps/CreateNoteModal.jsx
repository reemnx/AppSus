
export default class CreateNoteModal extends React.Component {

    state = {
        createNotePlaceholder: 'Whats on your mind?',
        type: null,
        isNoteActive: false
    }

    setChanges() {
        this.props.modalType(this.state.isNoteActive, this.state.type, this.state.createNotePlaceholder)
    }

    onTypeTxt = () => {
        this.setState({ type: 'NoteText', createNotePlaceholder: 'Click to create Text note' }, () => {
            this.setChanges()
        })
    }

    onTypeImg = () => {
        this.setState({ type: 'NoteImg', createNotePlaceholder: 'Click to create Image note' }, () => {
            this.setChanges()
        })
    }

    onTypeVid = () => {
        this.setState({ type: 'NoteVid', createNotePlaceholder: 'Click to create Video note' }, () => {
            this.setChanges()
        })
    }

    onTypeTodo = () => {
        this.setState({ type: 'NoteTodos', createNotePlaceholder: 'Click to create List note' }, () => {
            this.setChanges()
        })
    }

    onNoteInputFocus = () => {
        this.setState({ isNoteActive: true }, () => {
            this.setChanges()
        })
    }

    render() {
        const { createNotePlaceholder } = this.state
        return (
            <div className="MK-create-note-wraper flex align-center">
                <input type="text" placeholder={createNotePlaceholder} onFocus={this.onNoteInputFocus} />
                <div className="MK-notes-types-wraper flex align-center space-between">
                    <span className="MK-text" onClick={this.onTypeTxt}></span>
                    <span className="MK-img" onClick={this.onTypeImg}></span>
                    <span className="MK-list" onClick={this.onTypeTodo}></span>
                    <span className="MK-vid" onClick={this.onTypeVid}></span>
                </div>
            </div>
        )
    }
}
