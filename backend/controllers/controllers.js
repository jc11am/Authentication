const People = require("../model/model")
const jwt = require("jsonwebtoken")

const token = function(_id, username){
    return jwt.sign({_id, username}, process.env.Secret, { expiresIn: "3d" })
}



//post request 
//Register
const register = async function(req, res){
    const { email, password, username, profile } = req.body

    try {
        const user = await People.register( email, password, username, profile )
            //create token
            const webToken = token(user._id, user.username)
        res.status(200).json({user, webToken})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Login
const login = async function(req, res){
    const { username, password } = req.body

    try {
        const user = await People.login( username, password )
        //create token
        const webToken = token(user._id, user.username)
        res.status(200).json({username, webToken})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get
const getUser = async function(req, res){
    const { username } = req.params

    try {
        if(!username){
            return  res.status(400).json({message: "Invalid Username"})
        }
        const user = await People.findOne({username})
        if(!user){
            res.status(400).json({message: "Not Authenticated"})
        }
        //Remove password from user
        const { password, ...rest } = Object.assign({}, user.toJSON())
        res.status(200).json({rest})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const generateOTP = async function(req, res){
    
}

const verifyOTP = async function(req, res){
    
}

const createResetSession = async function(req, res){
    
}
//Put
const updateUser = async function(req, res){
    const id = req.query.id

    try {
        if(!id){
          return  res.status(400).json({message: "Not Authorized"})
        }
        const body =req.body;
        const newBody = await People.updateOne({ _id: id }, body)
        res.status(200).json({message: "User Updated"})

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

const resetPassword = async function(req, res){
    
}

module.exports = {
    login,
    resetPassword,
    updateUser,
    createResetSession,
    verifyOTP,
    generateOTP,
    getUser,
    register
}