const express = require("express")
const router = express.Router()


//Get Method
router.get("/user/:username", function(req,res){
    res.status(200).json("hello")
})
router.get("/generateotp", function(req,res){
    res.status(200).json("hello")
})
router.get("/verifyotp", function(req,res){
    res.status(200).json("hello")
})
router.get("/createresetsession", function(req,res){
    res.status(200).json("hello")
})

//Post Method
router.post("/register", function(req, res){
    res.json({message: "Posted"})
});
router.post("/registermail", function(req, res){
    res.json({message: "Posted"})
});
router.post("/authenticate", function(req, res){
    res.json({message: "Posted"})
}) 
router.post("/login", function(req, res){
    res.json({message: "Posted"})
}) 

//Put Method
router.put("/updateuser")
router.put("/resetpassword")


module.exports = router