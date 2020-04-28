import { eventBus } from '../../../services/eventBusService.js'
import MainMenu from '../../../cmps/MainMenu.jsx'
import NotesServices from '../services/NotesServices.js'
import NoteTxt from './NoteTxt.jsx'
import NoteImg from './NoteImg.jsx'
import NoteVid from './NoteVid.jsx'
import NoteTodos from './NoteTodos.jsx'
import CreateNoteModal from './CreateNoteModal.jsx'
import UserMsg from './UserMsg.jsx'
import NotesList from './NotesList.jsx'

export default class MissKeepApp extends React.Component {

    state = {
        type: 'NoteText',
        isNoteActive: false,
        notes: null,
        createNotePlaceholder: 'Whats on your mind?'
    }

    componentDidMount() {
        this.updateNotesList()
    }

    updateNotesList = () => {
        NotesServices.getNotes()
            .then(res => { this.setState({ isNoteActive: false, notes: res }) })
    }

    onCloseNoteCreation = () => {
        this.setState({ isNoteActive: false })
    }

    onModalTypeChange = (modalStatus, modalType, modalPlaceholder) => {
        this.setState({ isNoteActive: modalStatus, type: modalType, createNotePlaceholder: modalPlaceholder })
    }

    onFilterActive = ({ target }) => {
        NotesServices.getNoteByTitle(target.value)
            .then(res => this.setState({ notes: res }))
    }

    onNewNotePush = () => {
        NotesServices.getNotes()
            .then(res => { this.setState({ isNoteActive: false, notes: res }) })
    }

    onPinNote = (id) => {
        NotesServices.pinNote(id)
            .then(res => {
                eventBus.emit('show-msg', `Note "${res.title}" Pinned!`)
                this.updateNotesList()
            })
    }

    onUnPinNote = (id) => {

        NotesServices.getNoteById(id)
            .then(res => {
                NotesServices.unPinNote(res)
                    .then(res => {
                        this.updateNotesList()
                        eventBus.emit('show-msg', `Note "${res[0].title}" UnPinned!`)
                    })
            })
    }

    onContentChange = (id, data) => {
        NotesServices.saveNoteUpdates(id, data)
    }

    onChangeTodosKeyValue = (note, key , data) => {
        
        NotesServices.changeTodoItemValue(note , key ,data)
    }

    onAddTodoItem = (note) =>{
        NotesServices.addNewTodoItem(note)
            .then(this.updateNotesList)
        
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
                                this.updateNotesList()
                                swalWithBootstrapButtons.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            })

                    } else if (
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
        const { isNoteActive, type, notes } = this.state
        return (
            <React.Fragment>
                <header className="MK-header flex justify-center align-center">
                    <nav className="flex align-center space-between container">
                        <h2 className="MK-logo"></h2>
                        <input type="text" placeholder="Search note" onChange={this.onFilterActive} />
                        <MainMenu></MainMenu>
                    </nav>
                </header>
                <main className="MK-content-container flex column align-center">
                    {!isNoteActive && <CreateNoteModal modalType={this.onModalTypeChange} />}

                    {/* Create Note Modal Style By Type */}
                    {isNoteActive && (type === 'NoteText') && <NoteTxt notePushed={this.onNewNotePush}
                        closemodal={this.onCloseNoteCreation} />}

                    {isNoteActive && (type === 'NoteImg') && <NoteImg notePushed={this.onNewNotePush} closemodal={this.onCloseNoteCreation} />}

                    {isNoteActive && (type === 'NoteVid') && <NoteVid notePushed={this.onNewNotePush} closemodal={this.onCloseNoteCreation} />}

                    {isNoteActive && (type === 'NoteTodos') && <NoteTodos notePushed={this.onNewNotePush} closemodal={this.onCloseNoteCreation} />}

                    {notes && <NotesList removeNote={this.onRemoveNote} updateNoteList={this.updateNotesList}
                        notes={notes.filter((note => note.isPinned))} sectionClass="MK-pinned-notes"
                        pinNote={this.onPinNote} unPinNote={this.onUnPinNote} noteContentChange={this.onContentChange}
                        changeTodosKeyValue={this.onChangeTodosKeyValue} addTodoItem={this.onAddTodoItem}
                    ></NotesList>}

                    {notes && <NotesList removeNote={this.onRemoveNote} updateNoteList={this.updateNotesList}
                        notes={notes.filter((note => !note.isPinned))} sectionClass="MK-notes-wraper"
                        pinNote={this.onPinNote} noteContentChange={this.onContentChange}
                        changeTodosKeyValue={this.onChangeTodosKeyValue} addTodoItem={this.onAddTodoItem}
                    ></NotesList>}


                </main>
                <UserMsg> </UserMsg>

            </React.Fragment>
        )
    }
}

