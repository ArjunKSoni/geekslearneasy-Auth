const express = require('express')
const User = require('../models/Register')
const router = express.Router()


router.post("/register", async (req, res) => {
  let newuser = new User({
    user: req.body.user,
    email: req.body.email,
    password: req.body.password,
    mobileNo: req.body.mobileNo,
    year: req.body.year,
    branch: req.body.branch,
    Linkedin: req.body.Linkedin,
    github: req.body.github,
    clg: req.body.clg
  })
  const userE = await User.findOne({ email: newuser.email });
  if (userE) {
    return res.json({ message: "User already exist", success: "fail" });
  }
  else {
    var hash = await Buffer.from(newuser.password, 'utf8').toString('base64')
    newuser.password = hash
    await newuser.save();
    newuser = await User.findOne({ email: newuser.email,password:newuser.password});
    const payload = newuser._id
    const authToken = await Buffer.from(payload, 'utf8').toString('base64') //creating json web token for payload
    return res.json({ authToken:authToken, user: newuser, message: "Account created successfully", success: "success" })
  }
})

router.post('/login', async (req, res) => {
  const registereduser = req.body.email;
  const password = req.body.password.toString();
  try {
    let olduser = await User.findOne({ email: registereduser });
    if (!olduser) {
      return res.status(400).json({ message: "User name not found", success: "fail" });
    }
    const passwordCompare = await Buffer.from(password, 'utf8').toString('base64')
    if (passwordCompare != olduser.password) {
      return res.status(400).json({ message: "invalid password", success: "fail" });
    }
    const payload = olduser._id
    const authToken = await Buffer.from(payload, 'utf8').toString('base64') //creating json web token for payload
    return res.json({ authToken, user: olduser, message: "Loged in successfully", success: "success" })

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "some error occured", success: "fail" });
  }
})



router.post("/updateProfile", async (req, res) => {
  try {
    let doc = await User.findOneAndUpdate(req.body.filter, req.body.update, {
      new: true
    });
    return res.json({ user: doc, message: "some error occured", success: "success" })
  } catch (error) {
    return res.status(400).json({ message: "some error occured", success: "fail" });
  }

})

module.exports = router;