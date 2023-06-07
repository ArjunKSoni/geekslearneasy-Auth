const mongoos = require('mongoose')
const NotesSchema = new mongoos.Schema({
    title: {
        type: String
    },
    desc: {
        type: String,
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