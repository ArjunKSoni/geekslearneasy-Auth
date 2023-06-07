const mongoos = require('mongoose')
const NotesSchema = new mongoos.Schema({
    title: {
        type: String
    },
    desc: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    }
})
const Notes = new mongoos.model("Note", NotesSchema)

module.exports = Notes;