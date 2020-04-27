import MainMenu from '../../../cmps/MainMenu.jsx'
import NotesServices from '../services/NotesServices.js'
import NoteTxt from './NoteTxt.jsx'
import NoteImg from './NoteImg.jsx'
import NoteVid from './NoteVid.jsx'
import NoteTodos from './NoteTodos.jsx'
import PinnedNotes from './PinnedNotes.jsx'
import UserMsg from './UserMsg.jsx'
import NotesList from './NotesList.jsx'

export default class MissKeepApp extends React.Component {

    state = {
        type: 'NoteText',
        isNoteActive: false,
        notes: null,
        pinnedNotes: null,
        createNotePlaceholder: 'Whats on your mind?'
    }
    updateNotesList = () => {
        NotesServices.getNotes()
            .then(res => { this.setState({ isNoteActive: false, notes: res }) })

        NotesServices.getPinnedNotes()
            .then(res => {
                this.setState({ pinnedNotes: res })
            })
    }
    componentDidMount() {
        NotesServices.getNotes()
            .then(res => { this.setState({ isNoteActive: false, notes: res }) })

        NotesServices.getPinnedNotes()
            .then(res => {
                this.setState({ pinnedNotes: res })
            })
    }

    onCloseNoteCreation = () => {
        this.setState({ isNoteActive: false })
    }

    onTypeTxt = () => {
        this.setState({ type: 'NoteText' , createNotePlaceholder: 'Click to create Text note'})
    }
    onTypeImg = () => {
        this.setState({ type: 'NoteImg' , createNotePlaceholder: 'Click to create Image note'})

    }
    onTypeVid = () => {
        this.setState({ type: 'NoteVid' , createNotePlaceholder: 'Click to create Video note'})

    }
    onTypeTodo = () => {
        this.setState({ type: 'NoteTodos' , createNotePlaceholder: 'Click to create List note'})
    }

    onNoteInputFocus = () => {
        this.setState({ isNoteActive: true })
        console.log(this.state.type);

    }

    onFilterActive = ({target}) =>{
        NotesServices.getNoteByTitle(target.value)
            .then(res => this.setState({notes: res}))
    }

    onNewNotePush = () => {
        NotesServices.getNotes()
            .then(res => { this.setState({ isNoteActive: false, notes: res }) })
    }

    render() {
        const { isNoteActive, type, notes, pinnedNotes , createNotePlaceholder } = this.state
        return (
            <React.Fragment>
                <header className="MK-header flex justify-center align-center">
                    <nav className="flex align-center space-between container">
                        <h2 className="MK-logo"></h2>
                        <input type="text" placeholder="Search note" onChange={this.onFilterActive}/>
                        <MainMenu></MainMenu>
                    </nav>
                </header>
                <main className="MK-content-container flex column align-center">
                    {!isNoteActive && <div className="MK-create-note-wraper flex align-center">
                        <input type="text" placeholder={createNotePlaceholder} onFocus={this.onNoteInputFocus} />
                        <div className="MK-notes-types-wraper flex align-center space-between">
                            <span className="MK-text" onClick={this.onTypeTxt}></span>
                            <span className="MK-img" onClick={this.onTypeImg}></span>
                            <span className="MK-list" onClick={this.onTypeTodo}></span>
                            <span className="MK-vid" onClick={this.onTypeVid}></span>
                        </div>
                    </div>}

                    {isNoteActive && (type === 'NoteText') && <NoteTxt notePushed={this.onNewNotePush}
                        closemodal={this.onCloseNoteCreation} />}

                    {isNoteActive && (type === 'NoteImg') && <NoteImg notePushed={this.onNewNotePush} closemodal={this.onCloseNoteCreation} />}

                    {isNoteActive && (type === 'NoteVid') && <NoteVid notePushed={this.onNewNotePush} closemodal={this.onCloseNoteCreation} />}
                    
                    {isNoteActive && (type === 'NoteTodos') && <NoteTodos notePushed={this.onNewNotePush} closemodal={this.onCloseNoteCreation} />}

                    {pinnedNotes && <PinnedNotes updateNoteList={this.updateNotesList} pinned={pinnedNotes}></PinnedNotes>}

                    {notes && <NotesList updateNoteList={this.updateNotesList} notes={notes}></NotesList>}
                </main>
                <UserMsg> </UserMsg>

            </React.Fragment>
        )
    }
}

