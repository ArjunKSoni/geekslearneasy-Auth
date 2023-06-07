const mongoos = require('mongoose')
const SubjectSchema = new mongoos.Schema({
    uid: {
        type: String,
    },
    subjects: {
        type: [String]
    }
})
const Subject = new mongoos.model("Subject", SubjectSchema)

module.exports = Subject;