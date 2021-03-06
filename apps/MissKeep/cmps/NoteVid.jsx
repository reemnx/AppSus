import NoteServices from '../services/NotesServices.js'
import UploadService from '../../../services/UploadService.js'
import { eventBus } from '../../../services/eventBusService.js'


export default class NoteImg extends React.Component {

    state = {
        title: null,
        vidUrl: null
    }

    onImgNoteSubmit = (ev) => {
        ev.preventDefault()
        let noteTitle = ev.target.getAttribute('title')
        let noteVidUrl = ev.target.getAttribute('vid')
        NoteServices.pushVidNotes(noteTitle, noteVidUrl)
            .then(res => {
                eventBus.emit('show-msg', `Note "${noteTitle}" added!`)
                this.props.notePushed()
            })
    }

    onTitleChange = ({ target }) => {
        this.setState({ title: target.value })
    }

    onVidUrlChange = ({ target }) => {
        this.setState({ vidUrl: target.value })
    }

    closeNoteCreation = () => {
        this.props.closemodal()
    }

    render() {
        const { title, vidUrl } = this.state
        return (
            <div>
                <form className="MK-img-note-modal flex column align-center" onSubmit={this.onImgNoteSubmit}
                    title={title} vid={vidUrl}>

                    <input type="text" name="title" placeholder="Title" onKeyUp={this.onTitleChange} />
                    <input type="text" value={vidUrl} name="vidUrl" placeholder="Enter video link" onChange={this.onVidUrlChange} />
                    <div className="MK-txt-modal-btns flex space-between">
                        <button onClick={this.closeNoteCreation}>Close</button>
                        <button>Submit Note</button>
                    </div>
                </form>
            </div>
        )
    }
}
