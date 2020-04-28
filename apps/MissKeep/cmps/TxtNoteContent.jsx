
export default function TxtNoteContent(props) {
    const {note} = props
    
    return (
        <div>
            <h2>#{note.title}</h2>
            <p contentEditable="true" suppressContentEditableWarning="true" spellCheck="false"
                onKeyUp={() => props.contentChange(note.id, event)}> {note.content} </p>
        </div>
    )
}
