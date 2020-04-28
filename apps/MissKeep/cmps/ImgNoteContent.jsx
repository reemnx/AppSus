export default function ImgNoteContent(props) {
    const {note} = props
    
    return (
        <div>
            <h2>#{note.title}</h2>
            <img className="MK-img-note-image" src={note.imgUrl} ></img>
            <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false" onKeyUp={() => props.contentChange(note.id, event)}>{note.content}</p>
        </div>
    )
}
