import storageService from '../../../services/storageService.js'
import utilService from '../services/utilService.js'
export default {
    pushTxtNotes,
    getNotes,
    removeNote,
    pushImgNotes,
    pushVidNotes,
    getPinnedNotes,
    getNoteById,
    getNoteIdxById,
    getNoteByTitle,
    pinNote,
    unPinNote,
    saveNoteUpdates,
    pushTodosNotes
}

const KEY = 'notesList'
let gTodosItems = []
let gNotes = storageService.loadFromStorage(KEY) || [
    {
        type: 'txtNote',
        title: 'Shopping',
        content: 'Banana , Apple , Orange , water , shoes , backpack',
        isPinned: false,
        id: utilService.getId()
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false,
        id: utilService.getId(),
        content: 'Describe this image...'
    },
    {
        type: 'txtNote',
        title: 'Long TxT',
        content: 'Will be read more/less option soon ♥',
        isPinned: false,
        id: utilService.getId()
    },
    {
        type: 'txtNote',
        title: 'Poop',
        content: 'Pooping is fun ',
        isPinned: false,
        id: utilService.getId()
    },
    {
        type: 'NoteVid',
        title: 'Vid Example',
        vidUrl: 'https://www.youtube.com/embed/Law7wfdg_ls',
        isPinned: true,
        id: utilService.getId(),
        content: 'Describe this Video...'
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/3250360/pexels-photo-3250360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false,
        id: utilService.getId(),
        content: 'Describe this image...'
    },
    {
        type: 'txtNote',
        title: 'ABC',
        content: 'ABCDEFGHIJKLMNOP ?',
        isPinned: true,
        id: utilService.getId()
    },
    {
        type: 'NoteImg',
        title: 'Gift',
        imgUrl: 'https://images.pexels.com/photos/842876/pexels-photo-842876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false,
        id: utilService.getId(),
        content: 'Describe this image...'
    }
]

function getNotes() {

    return Promise.resolve(gNotes)
}

function getNoteById(id) {
    let note = gNotes.filter((el) => el.id === id)
    return Promise.resolve(note)
}

function getNoteByTitle(data) {

    let notes = gNotes.filter((el) => el.title.includes(data) ||  el.content.includes(data))  
    return Promise.resolve(notes)
}

function getNoteIdxById(id) {
    let idx = gNotes.findIndex((el) => el.id === id)
    return Promise.resolve(idx)
}

function removeNote(idx) {
    gNotes.splice(idx, 1)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function pushTxtNotes(title, content) {
    let txtNote = {
        type: 'txtNote',
        isPinned: false,
        title,
        content,
        id: utilService.getId()
    }

    gNotes.push(txtNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}
function pushImgNotes(title, imgUrl) {
    let imgNote = {
        type: 'NoteImg',
        isPinned: false,
        title,
        imgUrl,
        id: utilService.getId(),
        content: 'Describe this image...'
    }

    gNotes.push(imgNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function pushVidNotes(title, vidUrl) {
    let vidNote = {
        type: 'NoteVid',
        isPinned: false,
        title,
        vidUrl,
        id: utilService.getId(),
        content: 'Describe this video...'
    }

    gNotes.push(vidNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function pushTodosNotes(title, todosList) {
    console.log(title , todosList);

    let todosNote = {
        type: 'NoteTodos',
        isPinned: false,
        title,
        id: utilService.getId(),
        content: 'About this List...',
        todosList
    }

    gNotes.push(todosNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function getPinnedNotes() {

    let pinnedNotes = gNotes.filter((el) => el.isPinned)
    return Promise.resolve(pinnedNotes)
}
function pinNote(idx) {
    gNotes[idx].isPinned = true
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve(gNotes[idx])
}
function unPinNote(note) {
    note[0].isPinned = false
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve(note)
}
function saveNoteUpdates(noteId,content) {
    let note = gNotes.find((el => el.id === noteId))
    note.content = content
    storageService.saveToStorage(KEY, gNotes)
}
