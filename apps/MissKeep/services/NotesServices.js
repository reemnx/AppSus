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
    pushTodosNotes,
    changeTodoItemValue,
    addNewTodoItem,
    pushNoteFromEmail
}

const KEY = 'notesList'
let gTodosItems = []
let gNotes = storageService.loadFromStorage(KEY) || [
    {
        type: 'txtNote',
        title: 'Shopping',
        content: 'Banana , Apple , Orange , water , shoes , backpack',
        isPinned: false,
        id: utilService.getId(),
        isFeaturesShown: false
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false,
        id: utilService.getId(),
        content: 'Describe this image...',
        isFeaturesShown: false
    },
    {
        type: 'txtNote',
        title: 'Long TxT',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic',
        isPinned: false,
        id: utilService.getId(),
        isFeaturesShown: false
    },
    {
        type: 'txtNote',
        title: 'Poop',
        content: 'Pooping is fun ',
        isPinned: false,
        id: utilService.getId(),
        isFeaturesShown: false
    },
    {
        type: 'NoteVid',
        title: 'Im a vid note',
        vidUrl: 'https://www.youtube.com/embed/Law7wfdg_ls',
        isPinned: true,
        id: utilService.getId(),
        content: 'Describe this Video...',
        isFeaturesShown: false
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/3250360/pexels-photo-3250360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false,
        id: utilService.getId(),
        content: 'Describe this image...',
        isFeaturesShown: false
    },
    {
        type: 'txtNote',
        title: 'ABC',
        content: 'Hover me for more features',
        isPinned: true,
        id: utilService.getId(),
        isFeaturesShown: false
    },
    {
        type: 'NoteImg',
        title: 'Gift',
        imgUrl: 'https://images.pexels.com/photos/842876/pexels-photo-842876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false,
        id: utilService.getId(),
        content: 'Describe this image...',
        isFeaturesShown: false
    },
    {
        type: 'NoteTodos',
        isPinned: true,
        title: 'im a list',
        id: utilService.getId(),
        content: 'About this List...',
        todosList: { item0: 'List item' },
        isFeaturesShown: false
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

    let notes = gNotes.filter((el) => el.title.includes(data) || el.content.includes(data))
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

    gNotes.unshift(txtNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}
function pushNoteFromEmail(title, content) {
    let txtNote = {
        type: 'txtNote',
        isPinned: false,
        title,
        content,
        id: utilService.getId()
    }

    gNotes.unshift(txtNote)
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

    gNotes.unshift(imgNote)
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

    gNotes.unshift(vidNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function pushTodosNotes(title, todosList) {
    console.log(title, todosList);

    let todosNote = {
        type: 'NoteTodos',
        isPinned: false,
        title,
        id: utilService.getId(),
        content: 'About this List...',
        todosList
    }

    gNotes.unshift(todosNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function getPinnedNotes() {

    let pinnedNotes = gNotes.filter((el) => el.isPinned)
    return Promise.resolve(pinnedNotes)
}
function pinNote(id) {
    let currNote = gNotes.find((el => el.id === id))
    currNote.isPinned = true
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve(currNote)
}
function unPinNote(note) {
    note[0].isPinned = false
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve(note)
}

function changeTodoItemValue(note, key, data) {
    console.log(note, key, data);
    note.todosList[key] = data
    storageService.saveToStorage(KEY, gNotes)
}

function addNewTodoItem(note) {
    let newKey = utilService.getId()
    note.todosList[newKey] = 'New list item'
    storageService.saveToStorage(KEY, gNotes)

    return Promise.resolve()
}

function saveNoteUpdates(noteId, content) {
    let note = gNotes.find((el => el.id === noteId))
    note.content = content
    storageService.saveToStorage(KEY, gNotes)
}
