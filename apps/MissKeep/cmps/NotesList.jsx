import TxtNoteContent from './TxtNoteContent.jsx'
import ImgNoteContent from './ImgNoteContent.jsx'
import VidNoteContent from './VidNoteContent.jsx'
import ListNoteContent from './ListNoteContent.jsx'
import BorderColorChange from './BorderColorChange.jsx'
import utilService from '../services/utilService.js'
export default class NoteList extends React.Component {

  state = {
    featuresClass: false
  }

  onChecked = () => {
    this.setState({ lineDecoration: 'MK-line' })
  }

  onContentChange = (id, event) => {
    this.props.noteContentChange(id, event.target.innerHTML)
  }

  onListItemValueChange = (note , key , event) =>{
    this.props.changeTodosKeyValue(note, key , event.target.innerHTML)
    
  }

  onRemoveNote = (id) => {
    this.props.removeNote(id)
  }

  onToPin = (id) => {
    this.props.pinNote(id)
  }

  onUnPin = (id) => {
    this.props.unPinNote(id)
  }

  onNewTodoItem = (note) => {
    this.props.addTodoItem(note)
    
  }
 
  onSetBgColor = (color ,noteId) => {
    document.getElementById(noteId).style.borderColor = color;
  }

  showNoteFeatures = (note,mode) => {
    note.isFeaturesShown = mode
    this.setState({featuresClass: true})
  }

  render() {
    const { notes , sectionClass} = this.props
   const {featuresClass} = this.state
    if (!notes.length) return <React.Fragment></React.Fragment>

    return (

      <section className={sectionClass}>
        {notes.map((note, idx) => {
        let rndId = utilService.getId()
            return (
              <div className="MK-txt-note flex align-center column" id={rndId} key={idx}
               onMouseEnter={()=>this.showNoteFeatures(note,true)} onMouseLeave={()=>this.showNoteFeatures(note,false)} >
                <div className="MK-note-header flex space-between align-center">

                  {note.type === 'txtNote' && <img className='MK-text' />}
                  {note.type === 'NoteImg' && <img className='MK-img' />}
                  {note.type === 'NoteVid' && <img className='MK-vid' />}
                  {note.type === 'NoteTodos' && <img className='MK-list' />}

                  {!note.isPinned && <img className='MK-pin' onClick={() => this.onToPin(note.id)} />}
                  {note.isPinned && <img className='MK-active-pin' onClick={() => this.onUnPin(note.id)} />}

                </div>
                
                {note.type === 'txtNote' && <TxtNoteContent contentChange={this.onContentChange} note={note} />}
                {note.type === 'NoteImg' && <ImgNoteContent contentChange={this.onContentChange} note={note} />}
                {note.type === 'NoteVid' && <VidNoteContent contentChange={this.onContentChange} note={note} />}
                {note.type === 'NoteTodos' && <ListNoteContent contentChange={this.onListItemValueChange} note={note} />}
                {note.type === 'NoteTodos' && <button className="MK-add-todo-item" onClick={() => this.onNewTodoItem(note)}>Add item</button>}

                <button className="MK-note-done-button" onClick={() => this.onRemoveNote(note.id)}>Done</button>
                {note.isFeaturesShown && <BorderColorChange noteId={rndId} setColor={this.onSetBgColor} />}
              </div>
            )
        })}

      </section >
    )
  }

}
