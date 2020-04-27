import NoteServices from '../services/NotesServices.js'
export default class PinnedNotes extends React.Component {

    componentDidMount(){
        
    }

    render() {
        let pinnedNotes = this.props.pinned
        if (!pinnedNotes) return <h2>loading..</h2>
        return (
            <section className="MK-pinned-notes flex align-center container">
            {pinnedNotes.map((note, idx) => {
              if (note.type === 'txtNote') {
                return (
                  <div className="MK-txt-note flex align-center column" key={idx}>
                    <div className="MK-note-header flex space-between align-center">
                      <img className='MK-text' />
                      <img className='MK-active-pin' />
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
                      <img className='MK-active-pin' />
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
                      <img className='MK-active-pin' />
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
