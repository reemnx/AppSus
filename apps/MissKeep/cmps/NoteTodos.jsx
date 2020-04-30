import NoteServices from '../services/NotesServices.js'
import UploadService from '../../../services/UploadService.js'
import { eventBus } from '../../../services/eventBusService.js'


export default class NoteTodos extends React.Component {

    state = {
        listCnt: 1,
        currTodos: [],
        noteTitle: null
    }

    onTodosNoteSubmit = (ev) =>{
        ev.preventDefault()
        let title = ev.target.getAttribute('title')
        let todos = this.state.currTodos;
        NoteServices.pushTodosNotes(title , todos)
        .then(res => {
            eventBus.emit('show-msg', `List "${title}" added!`)
            this.props.notePushed()
         })   
    }

    onTitleChange = ({target}) =>{
        let title = target.value
        this.setState({noteTitle: title})
    }

    onItemInput = ({ target }) => {
        let todoValue = target.value
        let activeItem = target.getAttribute('name')
        this.setState(prevState => ({ currTodos: {...prevState.currTodos, [activeItem]: todoValue}}))
    }

    onAddListItem = (ev) => {
        ev.preventDefault()
        this.setState(prevState => ({ listCnt: prevState.listCnt + 1 }))
    }

    closeNoteCreation = () => {
        this.props.closemodal()
    }
    get inputs() {
        const elInputs = []
        for (let i = 0; i < this.state.listCnt; i++) {
            elInputs.push(<input key={i} type="text" name={'todo' + i} placeholder={'item' + ' ' + (i + 1)}
             onChange={this.onItemInput} />)
        }
        return elInputs
    }
    render() {
        const {currTodos , noteTitle} = this.state
        return (
            <div>
                <form className="MK-img-note-modal flex column align-center" onSubmit={this.onTodosNoteSubmit}
                    todos={currTodos} title={noteTitle}>
                    <input type="text" name="title" placeholder="List title" onKeyUp={this.onTitleChange} />
                    <div className="list-items">
                        {this.inputs}
                    </div>
                    <button className="MK-todos-add-btn" onClick={this.onAddListItem}>Add item</button>
                    <div className="MK-txt-modal-btns flex space-between">
                        <button onClick={this.closeNoteCreation}>Close</button>
                        <button>Submit Note</button>
                    </div>
                </form>
            </div>
        )
    }
}
