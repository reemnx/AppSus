import MainMenu from '../../../cmps/MainMenu.jsx'
import NotesServices from '../services/NotesServices.js'
import NoteTxt from './NoteTxt.jsx'
import NoteImg from './NoteImg.jsx'
import UserMsg from './UserMsg.jsx'
import NotesList from './NotesList.jsx'

export default class MissKeepApp extends React.Component {

    state = {
        type: 'NoteText',
        isNoteActive: false,
        notes: null
    }

    updateNotesList=()=>{
        NotesServices.getNotes()
         .then(res => {this.setState({isNoteActive: false , notes: res})})
    }

    componentDidMount(){
        NotesServices.getNotes()
         .then(res => {this.setState({isNoteActive: false , notes: res})})
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
        console.log(this.state.type);
        
    }

    onNewNotePush = () =>{
        NotesServices.getNotes()
         .then(res => {this.setState({isNoteActive: false , notes: res})})
    }

    // componentDidUpdate(){
    //     console.log('UPDATED');
        
    // }

    render() {
        const { isNoteActive, type , notes} = this.state
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
                            <span className="MK-text" onClick={this.onTypeTxt}></span>
                            <span className="MK-img" onClick={this.onTypeImg}></span>
                            <span className="MK-list" onClick={this.onTypeTodo}></span>
                        </div>
                    </div>}

                    {isNoteActive && (type === 'NoteText') && <NoteTxt notePushed={this.onNewNotePush}
                     closemodal={this.onCloseNoteCreation} />}

                    {isNoteActive && (type === 'NoteImg') && <NoteImg notePushed={this.onNewNotePush} />}

                    {notes && <NotesList updateNoteList={this.updateNotesList} notes={notes}></NotesList>}
                </main>
                <UserMsg> </UserMsg>

            </React.Fragment>
        )
    }
}

