import TxtNoteContent from './TxtNoteContent.jsx'
import ImgNoteContent from './ImgNoteContent.jsx'
import VidNoteContent from './VidNoteContent.jsx'
import ListNoteContent from './ListNoteContent.jsx'
export default class NoteList extends React.Component {

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
 
  render() {
    const { notes , sectionClass} = this.props
   
    if (!notes.length) return <React.Fragment></React.Fragment>

    return (

      <section className={sectionClass}>
        {notes.map((note, idx) => {
        
            return (
              <div className="MK-txt-note flex align-center column" key={idx}>
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

                <button onClick={() => this.onRemoveNote(note.id)}>Done</button>
              </div>
            )
        })}

      </section >
    )
  }

}
