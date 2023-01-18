const express = require("express")
const router = express.Router()
const userAuth = require("../middleware/userAuth")
const registerMail = require("../controllers/mailer")
const {updateAuth, localVariables} = require("../middleware/updateAuth")
const { login,
    resetPassword,
    updateUser,
    createResetSession,
    verifyOTP,
    generateOTP,
    getUser,
    register } = require("../controllers/controllers")


//Get Method
router.get("/user/:username", getUser)
router.get("/generateotp",userAuth, localVariables, generateOTP)
router.get("/verifyotp",userAuth, verifyOTP)
router.get("/createresetsession", createResetSession)

//Post Method
router.post("/register", register);
router.post("/registermail", registerMail);
router.post("/authenticate",userAuth, (req, res) => res.end()) 
router.post("/login", userAuth, login)  

//Put Method
router.put("/updateuser",updateAuth, updateUser)
router.put("/resetpassword",userAuth, resetPassword)


module.exports = router