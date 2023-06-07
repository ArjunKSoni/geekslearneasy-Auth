const express = require('express')
const Subject = require('../models/Subject')
const router = express.Router()
const subjects = require("../subjects.json")


router.get("/getallsubjects", async (req, res) => {
    try {
        var keys = [];
        Array.from(subjects).forEach((e) => {
            keys.push(Object.keys(e)[0])
        })
        return res.json({ subjects: keys, message: "All subjects fetched successfully", success: "success" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})
router.post("/getOnesubjectClick", async (req, res) => {
    let subj = req.body.subj;
    try {
        var keys = [];
        subjects.forEach((e) => {
            if (Object.keys(e)[0] === subj) {
                keys.push(e);
                return
            }
        })
        return res.json({ subjects: keys, message: "All subjects fetched successfully", success: "success" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})

router.post("/addsubjects", async (req, res) => {
    try {
        let newSubj = new Subject({
            uid: req.body.uid,
            subjects: req.body.subj
        })
        if (await Subject.findOne({ uid: newSubj.uid })) {
            await Subject.findOneAndUpdate({ uid: newSubj.uid }, { subjects: req.body.subj }, {
                new: true
            });
            return res.json({ message: "subject updated successfully", success: "success" })
        }
        await newSubj.save();
        return res.json({ message: "subject added successfully", success: "success" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})

router.post("/findmysubjects", async (req, res) => {
    try {
        let mysubj = await Subject.findOne({ uid: req.body.uid })
        if (mysubj) {
            return res.json({ subjects: mysubj, message: "subject fetched successfully", success: "success" })
        }
        return res.json({ message: "subject not present", success: "fail" })
    } catch (error) {
        return res.status(400).json({ message: "some error occured", success: "fail" });
    }
})
module.exports = router;

