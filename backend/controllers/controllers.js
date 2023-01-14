const People = require("../model/model")

//post request 
const register = async function(req, res){
    const { email, password, username, profile } = req.body

    try {
        const user = await People.register( email, password, username, profile )
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const login = async function(req, res){
    
}

//get
const getUser = async function(req, res){
    
}

const generateOTP = async function(req, res){
    
}

const verifyOTP = async function(req, res){
    
}

const createResetSession = async function(req, res){
    
}
//Put
const updateUser = async function(req, res){
    
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