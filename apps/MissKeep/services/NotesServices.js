export default{
    pushTxtNotes,
    getNotes
}

let gNotes = []

function getNotes(){
    console.log('Note pushed');
    return gNotes
}

function pushTxtNotes(title,content){
    let txtNote = {
        title,
        content
    }

    gNotes.push(txtNote)
    return Promise.resolve()
}

