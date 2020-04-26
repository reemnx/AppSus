
import NotesServices from '../services/NotesServices.js'
export default class NoteList extends React.Component {

    onRemoveNote = ({target}) => {
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
                 .then(()=>{
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
            <section className="MK-notes-wraper flex align-center container">
                {notes.map((note, idx) => {
                    if (note.type === 'txtNote') {
                        return (
                            <div className="MK-txt-note flex align-center column" key={idx}>
                                <img className='MK-text' />
                                <h2>#{note.title}</h2>
                                <p contentEditable="true" spellCheck="false"> {note.content} </p>
                                <button idx={idx} onClick={this.onRemoveNote}>Done</button>
                            </div>
                        )
                    }
                    if (note.type === 'NoteImg') {
                        return (
                            <div className="MK-img-note flex align-center column" key={idx}>
                                <img className='MK-img' />
                                <h2>#{note.title}</h2>
                                <img className="MK-img-note-image" src={note.imgUrl} ></img>
                                <button idx={idx} onClick={this.onRemoveNote}>Done</button>
                            </div>
                        )
                    }
                })}

            </section >
        )
    }

}