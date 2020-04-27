import { eventBus } from '../../../services/eventBusService.js'
import NotesServices from '../services/NotesServices.js'
export default class NoteList extends React.Component {

  state = {
    lineDecoration: ''
  }

  onChecked = () =>{
    this.setState({lineDecoration: 'MK-line'})
  }

  onContentChange = ({ target }) => {
    let id = target.getAttribute('id')
    NotesServices.saveNoteUpdates(id, target.innerHTML)
  }

  onRemoveNote = ({ target }) => {
    let idx = target.getAttribute('idx');

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        NotesServices.removeNote(idx)
          .then(() => {
            this.props.updateNoteList()
            eventBus.emit('show-msg', `Note Deleted!`)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }

  onToPin = ({ target }) => {
    let idx = target.getAttribute('idx')
    NotesServices.pinNote(idx)
      .then(res => {
        eventBus.emit('show-msg', `Note "${res.title}" Pinned!`)
        this.props.updateNoteList()
      })
  }

  render() {
    const { notes } = this.props
    const { lineDecoration } = this.state
    if (!notes) return <h2>loading..</h2>
    return (
      <section className="MK-notes-wraper container">
        {/* flex align-center justify-center container */}
        {notes.map((note, idx) => {
          if (note.type === 'txtNote' && !note.isPinned) {
            return (
              <div className="MK-txt-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-text' />
                  <img className='MK-pin' idx={idx} onClick={this.onToPin} />
                </div>
                <h2>#{note.title}</h2>
                <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false" id={note.id} onKeyUp={this.onContentChange}> {note.content} </p>
                <button idx={idx} onClick={this.onRemoveNote}>Done</button>
              </div>
            )
          }
          else if (note.type === 'NoteImg' && !note.isPinned) {
            return (
              <div className="MK-img-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-img' />
                  <img className='MK-pin' idx={idx} onClick={this.onToPin} />
                </div>
                <h2>#{note.title}</h2>
                <img className="MK-img-note-image" src={note.imgUrl} ></img>
                <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false" id={note.id} onKeyUp={this.onContentChange}>{note.content}</p>
                <button idx={idx} onClick={this.onRemoveNote}>Done</button>
              </div>
            )
          }
          else if (note.type === 'NoteVid' && !note.isPinned) {
            return (
              <div className="MK-vid-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-vid' />
                  <img className='MK-pin' idx={idx} onClick={this.onToPin} />
                </div>
                <h2>#{note.title}</h2>
                <iframe width="400" height="215" src={note.vidUrl} ></iframe>
                <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{note.content}</p>
                <button id={note.id} onClick={this.onRemoveNote}>Done</button>
              </div>
            )
          }

          else if (note.type === 'NoteTodos' && !note.isPinned) {
            return (
              <div className="MK-vid-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-list' />
                  <img className='MK-pin' idx={idx} onClick={this.onToPin} />
                </div>
                <h2>#{note.title}</h2>
                {Object.keys(note.todosList).map(key =>
                  <div className="todo-note-item-wraper flex space-between">
                    <div className="MK-checkbox flex">
                      <input type="checkbox" onChange={this.onChecked} />
                      <h3 className={lineDecoration} value={key} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{note.todosList[key]}</h3>
                    </div>
                    <h4>{moment().format('MMMM Do, h:mm')}</h4>
                  </div>
                )}
                <button id={note.id} idx={idx} onClick={this.onRemoveNote}>Done</button>
              </div>
            )
          }

        })}

      </section >
    )
  }

}
