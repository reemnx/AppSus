export default{
    pushTxtNotes
}

let gNotes = []

function pushTxtNotes(title,content){
    let txtNote = {
        title,
        content
    }

    gNotes.push(txtNote)
    return Promise.resolve()
}

