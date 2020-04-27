import storageService from '../../../services/storageService.js'
export default {
    pushTxtNotes,
    getNotes,
    removeNote,
    pushImgNotes,
    pushVidNotes,
    getPinnedNotes
}

const KEY = 'notesList'

let gNotes = [
    {
        type: 'txtNote',
        title: 'Shopping',
        content: 'Banana , Apple , Orange , water , shoes , backpack',
        isPinned: false
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false
    },
    {
        type: 'txtNote',
        title: 'Long TxT',
        content: 'Will be read more/less option soon ♥',
        isPinned: false
    },
    {
        type: 'txtNote',
        title: 'Poop',
        content: 'Pooping is fun ',
        isPinned: false
    },
    {
        type: 'NoteVid',
        title: 'Vid Example',
        vidUrl: 'https://www.youtube.com/embed/ZzSs_8ovVyM',
        isPinned: true
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/3250360/pexels-photo-3250360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false
    },
    {
        type: 'txtNote',
        title: 'ABC',
        content: 'ABCDEFGHIJKLMNOP ?',
        isPinned: true
    },
    {
        type: 'NoteImg',
        title: 'Gift',
        imgUrl: 'https://images.pexels.com/photos/842876/pexels-photo-842876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isPinned: false
    }
]

function getNotes() {
    return Promise.resolve(gNotes)
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
        content
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
        imgUrl
    }

    gNotes.push(imgNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}

function pushVidNotes(title, vidUrl) {
    let imgNote = {
        type: 'NoteVid',
        isPinned: false,
        title,
        vidUrl
    }

    gNotes.push(imgNote)
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve()
}
function getPinnedNotes() {
    
    let pinnedNotes = gNotes.filter((el)=> el.isPinned)
    return Promise.resolve(pinnedNotes)
}

