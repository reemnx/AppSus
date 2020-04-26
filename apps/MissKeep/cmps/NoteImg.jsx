import NoteServices from '../services/NotesServices.js'
import UploadService from '../../../services/UploadService.js'
import { eventBus } from '../../../services/eventBusService.js'


export default class NoteImg extends React.Component {

    state = {
        title: null,
        imgUrl: null
    }

    onNoteSubmited = (ev) => {
        ev.preventDefault()
        console.log('HI');
        // let noteTitle = ev.target.getAttribute('title')
        // let noteImgUrl = ev.target.getAttribute('img')
        
        // NoteServices.pushImgNotes(noteTitle,noteImgUrl)
        //  .then(res => {
        //     eventBus.emit('show-msg', `Note "${noteTitle}" added!`)
        //     this.props.notePushed()
        //  }) 
    }

    onImgNoteSubmit = (ev) =>{
        ev.preventDefault()
        let noteTitle = ev.target.getAttribute('title')
        let noteImgUrl = ev.target.getAttribute('img')
        NoteServices.pushImgNotes(noteTitle,noteImgUrl) 
         .then(res => {
            eventBus.emit('show-msg', `Note "${noteTitle}" added!`)
            this.props.notePushed()
         })   
    }

    onTitleChange = ({target}) =>{
        this.setState({title: target.value}) 
    }

    onImgUrlChange = ({target}) =>{
        this.setState({imgUrl: target.value}) 
    }

    closeNoteCreation = () => {
        this.props.closemodal()
    }

    render() {
        const {title,imgUrl} = this.state
        return (
            <div>
                <form className="MK-img-note-modal flex column align-center" onSubmit={this.onImgNoteSubmit}
                title={title} img={imgUrl}>
                
                    <input type="text" name="title" placeholder="Title" onKeyUp={this.onTitleChange}/>
                    <input type="text" name="imgUrl" placeholder="Enter img url" onChange={this.onImgUrlChange}/>
                    <div className="MK-txt-modal-btns flex space-between">
                        <button onClick={this.closeNoteCreation}>Close</button>
                        <button>Submit Note</button>
                    </div>
                </form>
            </div>
        )
    }
}
