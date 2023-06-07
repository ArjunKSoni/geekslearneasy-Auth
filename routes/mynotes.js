const express = require('express')
const Note = require('../models/Notes')
const router = express.Router()


router.post("/addnotes", async (req, res) => {
    try {
        let newNote = new Note({
            title: req.body.title,
            desc: req.body.desc,
            time: req.body.time,
            uid: req.body.uid,
        })
        await newNote.save();
        const note = await Note.findOne({ uid: newNote.uid });
        return res.json({ notes: note, message: "Note added successfully", success: "success" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})
router.post("/updateNotes", async (req, res) => {
    try {
        let note_id = req.body.note_id
        let note = await Note.findOneAndUpdate({ _id: note_id }, req.body.update, {
            new: true
        });

        return res.json({ notes: note, message: "Note updated successfully", success: "success" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})
router.post("/deleteNotes", async (req, res) => {
    try {
        let note = await Note.findByIdAndDelete(req.body.note_id)
        return res.json({ notes: note, message: "Note deleted successfully", success: "success" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})
router.post("/findalleNotes", async (req, res) => {
    try {
        let note = await Note.find({ uid: req.body.uid })
        return res.json({ notes: note, message: "Note fetched successfully", success: "success" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})

module.exports = router;