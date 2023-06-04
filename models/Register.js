const mongoos = require('mongoose')
const RegisterSchema = new mongoos.Schema({
    user: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    Linkedin: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    clg: {
        type: String,
        required: true,
    },
})
const Register = new mongoos.model("Authentication", RegisterSchema)

module.exports = Register;