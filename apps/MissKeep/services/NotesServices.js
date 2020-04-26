export default {
    pushTxtNotes,
    getNotes,
    removeNote,
    pushImgNotes
}

let gNotes = [
    {
        type: 'txtNote',
        title: 'Shopping',
        content: 'Banana , Apple , Orange , water , shoes , backpack'
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        type: 'txtNote',
        title: 'Long TxT',
        content: 'Will be read more/less option soon ♥'
    },
    {
        type: 'txtNote',
        title: 'Poop',
        content: 'Pooping is fun '
    },
    {
        type: 'NoteImg',
        title: 'Example Img',
        imgUrl: 'https://images.pexels.com/photos/3250360/pexels-photo-3250360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    },
    {
        type: 'txtNote',
        title: 'ABC',
        content: 'ABCDEFGHIJKLMNOP ?'
    },
    {
        type: 'NoteImg',
        title: 'Gift',
        imgUrl: 'https://images.pexels.com/photos/842876/pexels-photo-842876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }
]

function getNotes() {
    console.log('Note pushed');
    return Promise.resolve(gNotes)
}

function removeNote(idx) {
    gNotes.splice(idx, 1)
    console.log(gNotes);

    return Promise.resolve()
}

function pushTxtNotes(title, content) {
    let txtNote = {
        type: 'txtNote',
        title,
        content
    }

    gNotes.push(txtNote)
    return Promise.resolve()
}
function pushImgNotes(title, imgUrl) {
    let imgNote = {
        type: 'NoteImg',
        title,
        imgUrl
    }

    gNotes.push(imgNote)
    return Promise.resolve()
}

