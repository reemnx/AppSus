import MainMenu from '../../../cmps/MainMenu.jsx'
import NotesServices from '../services/NotesServices.js'
import NoteTxt from './NoteTxt.jsx'
import UserMsg from './UserMsg.jsx'
import NotesList from './NotesList.jsx'

export default class MissKeepApp extends React.Component {

    state = {
        type: 'NoteText',
        isNoteActive: false,
        notesList: null

    }
    onCloseNoteCreation = () => {
        this.setState({ isNoteActive: false })
    }

    onTypeTxt = () => {
        this.setState({ type: 'NoteText' })
    }
    onTypeImg = () => {
        this.setState({ type: 'NoteImg' })
    }
    onTypeTodo = () => {
        this.setState({ type: 'NoteTodos' })
    }

    onNoteInputFocus = () => {
        this.setState({ isNoteActive: true })
    }

    onNewNotePush = () =>{
        let notes = NotesServices.getNotes()
        this.setState({notesList: notes , isNoteActive: false}) 
    }

    render() {
        const { isNoteActive, type ,notesList} = this.state
        return (
            <React.Fragment>
                <header className="MK-header flex justify-center align-center">
                    <nav className="flex align-center space-between container">
                        <h2>LOGO</h2>
                        <input type="text" placeholder="Search note" />
                        <MainMenu></MainMenu>
                    </nav>
                </header>
                <main className="MK-content-container flex column align-center">
                    {!isNoteActive && <div className="MK-create-note-wraper flex align-center">
                        <input type="text" placeholder="Whats on your mind?" onFocus={this.onNoteInputFocus} />
                        <div className="MK-notes-types-wraper flex align-center space-between">
                            <span className="MK-txt" onClick={this.onTypeTxt}>Txt</span>
                            <span onClick={this.onTypeImg}>Img</span>
                            <span onClick={this.onTypeTodo}>Todo</span>
                        </div>
                    </div>}

                    {isNoteActive && (type === 'NoteText') && <NoteTxt notepushed={this.onNewNotePush}
                     closemodal={this.onCloseNoteCreation} />}

                    {notesList && <NotesList notes={notesList}></NotesList>}
                </main>
                <UserMsg> </UserMsg>

            </React.Fragment>
        )
    }
}

