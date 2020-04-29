import { eventBus } from '../../../services/eventBusService.js'
import NotesServices from '../services/NotesServices.js'
export default class PinnedNotes extends React.Component {

  onUnpin = ({ target }) => {

    let id = target.getAttribute('id')
    NotesServices.getNoteById(id)
      .then(res => {
        NotesServices.unPinNote(res)
          .then(res => {
            console.log(res);

            this.props.updateNoteList()
            eventBus.emit('show-msg', `Note "${res[0].title}" UnPinned!`)
          })
      })
  }

  onRemoveNote = (id) => {
    NotesServices.getNoteIdxById(id)
      .then(res => {

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
            NotesServices.removeNote(res)
              .then(() => {
                this.props.updateNoteList()
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
      })
  }

  render() {
    let pinnedNotes = this.props.pinned
    if (!pinnedNotes.length) return <React.Fragment></React.Fragment>
    return (
      <section className="MK-pinned-notes  container">
        {/* flex align-center */}
        {pinnedNotes.map((note, idx) => {
          if (note.type === 'txtNote' && note.isPinned) {
            return (
              <div className="MK-txt-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-text' />
                  <img className='MK-active-pin' id={note.id} onClick={this.onUnpin} />
                </div>
                <h2>#{note.title}</h2>
                <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false"> {note.content} </p>
                <button onClick={() => this.onRemoveNote(note.id)}>Done</button>
              </div>
            )
          }
          else if (note.type === 'NoteImg' && note.isPinned) {
            return (
              <div className="MK-img-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-img' />
                  <img className='MK-active-pin' id={note.id} onClick={this.onUnpin} />
                </div>
                <h2>#{note.title}</h2>
                <img className="MK-img-note-image" src={note.imgUrl} ></img>
                <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{note.content}</p>
                <button onClick={() => this.onRemoveNote(note.id)}>Done</button>
              </div>
            )
          }
          else if (note.type === 'NoteVid' && note.isPinned) {
            return (
              <div className="MK-vid-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-vid' />
                  <img className='MK-active-pin' id={note.id} onClick={this.onUnpin} />
                </div>
                <h2>#{note.title}</h2>
                <iframe width="400" height="215" src={note.vidUrl} ></iframe>
                <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{note.content}</p>
                <button onClick={() => this.onRemoveNote(note.id)}>Done</button>
              </div>
            )
          }

          else if (note.type === 'NoteTodos' && note.isPinned) {
            return (
              <div className="MK-vid-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-list' />
                  <img className='MK-active-pin' id={note.id} onClick={this.onUnpin} />
                </div>
                <h2>#{note.title}</h2>
                {Object.keys(note.todosList).map(key =>
                  <div className="todo-note-item-wraper flex space-between">
                    <div className="MK-checkbox flex">
                      <input type="checkbox" />
                      <h3 value={key} contentEditable="true" suppressContentEditableWarning="true" spellCheck="false">{note.todosList[key]}</h3>
                    </div>
                    <h4>{moment().format('MMMM Do')}</h4>
                  </div>
                )}
                <button onClick={() => this.onRemoveNote(note.id)}>Done</button>
              </div>
            )
          }
        })}

      </section >
    )
  }
}
