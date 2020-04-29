import NoteServices from '../services/NotesServices.js'
import { eventBus } from '../../../services/eventBusService.js'
export default class NoteTxt extends React.Component {

    state = {
        title: null,
        content: null,
        isFirstClick: false
    }

    onTitleChange = ({target}) =>{
        this.setState({title: target.value}) 
    }
    onNoteChange = ({target}) =>{
        this.setState({content: target.innerHTML})
    }

    onNoteSubmited = (ev) => {
        ev.preventDefault()
        let noteTitle = ev.target.getAttribute('title')
        let noteContent = ev.target.getAttribute('note')
        NoteServices.pushTxtNotes(noteTitle,noteContent)
         .then(res => {
            eventBus.emit('show-msg', `Note "${noteTitle}" added!`)
            this.props.notePushed()
         }) 
    }

    closeNoteCreation = () => {
        this.props.closemodal()
    }

    onUserClick =({target}) =>{
        if(this.state.isFirstClick) return
        target.innerHTML = ''
        this.setState({isFirstClick: true})
    }


    render() {
        const {title , content} = this.state
        return (
            <div>
                <form className="MK-txt-note-modal flex column align-center"
                    onSubmit={this.onNoteSubmited} title={title} note={content}>
                    <input type="text" name="title" placeholder="Title" onChange={this.onTitleChange}/>
                    <blockquote contentEditable="true" onClick={this.onUserClick} onKeyUp={this.onNoteChange}>
                    Take a note...
                    </blockquote>
                    <div className="MK-txt-modal-btns flex space-between">
                        <button onClick={this.closeNoteCreation}>Close</button>
                        <button>Submit Note</button>

                    </div>
                </form>
            </div>
        )
    }
}
