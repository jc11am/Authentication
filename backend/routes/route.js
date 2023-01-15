const express = require("express")
const router = express.Router()
const userAuth = require("../middleware/userAuth")
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
router.get("/generateotp", generateOTP)
router.get("/verifyotp", verifyOTP)
router.get("/createresetsession", createResetSession)

//Post Method
router.post("/register", register);
router.post("/registermail", function(req, res){
    res.json({message: "Posted"})
});
router.post("/authenticate", function(req, res){
    res.json({message: "Posted"})
}) 
router.post("/login", userAuth, login) 

//Put Method
router.put("/updateuser", updateUser)
router.put("/resetpassword", resetPassword)


module.exports = router