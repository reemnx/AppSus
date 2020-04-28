export default function VidNoteContent(props) {
    const {note} = props
    
    return (
        <div className="MK-vid-note-content">
            <h2>#{note.title}</h2>
            <iframe width="400" height="215" src={note.vidUrl} ></iframe>
            <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false" onKeyUp={() => props.contentChange(note.id, event)}>{note.content}</p>
        </div>
    )
}