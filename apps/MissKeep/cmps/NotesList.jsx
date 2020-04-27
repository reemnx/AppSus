
import NotesServices from '../services/NotesServices.js'
export default class NoteList extends React.Component {

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
  render() {
    const { notes } = this.props
    if (!notes) return <h2>loading..</h2>
    return (
      <section className="MK-notes-wraper flex align-center justify-center container">
        {notes.map((note, idx) => {
          if (note.type === 'txtNote') {
            return (
              <div className="MK-txt-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-text' />
                  <img className='MK-pin' />
                </div>
                <h2>#{note.title}</h2>
                <p contentEditable="true" spellCheck="false"> {note.content} </p>
                <button idx={idx} onClick={this.onRemoveNote}>Done</button>
              </div>
            )
          }
          else if (note.type === 'NoteImg') {
            return (
              <div className="MK-img-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-img' />
                  <img className='MK-pin' />
                  </div>
                <h2>#{note.title}</h2>
                <img className="MK-img-note-image" src={note.imgUrl} ></img>
                <p contentEditable="true" spellCheck="false">Describe this image...</p>
                <button idx={idx} onClick={this.onRemoveNote}>Done</button>
              </div>
            )
          }
          else if (note.type === 'NoteVid') {
            return (
              <div className="MK-vid-note flex align-center column" key={idx}>
                <div className="MK-note-header flex space-between align-center">
                  <img className='MK-vid' />
                  <img className='MK-pin' />
                  </div>
                <h2>#{note.title}</h2>
                <iframe width="400" height="215" src={note.vidUrl} frameborder="0" allow="autoplay;" allowfullscreen></iframe>
                <p contentEditable="true" spellCheck="false">Note some details...</p>
                <button idx={idx} onClick={this.onRemoveNote}>Done</button>
              </div>
            )
          }
        })}

      </section >
    )
  }

}