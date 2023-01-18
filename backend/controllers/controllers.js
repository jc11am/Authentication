const People = require("../model/model")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")

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
    const { username } = req.params;

    try {
        if(!username){
            return  res.status(400).json({message: "Invalid User"})
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
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(200).json({ code: req.app.locals.OTP })
}

const verifyOTP = async function(req, res){
    const { code } = req.query;
    //Check if code match
    if(parseInt( req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; //Rest OTP
        req.app.locals.resetSession = true; //Start session for reset password
        return res.status(200).json({message: "Verify Successfully"})
    }
    return res.status(400).json({error: "Invalid OTP"})
    
}

const createResetSession = async function(req, res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;
        return res.status(200).json({message: "access granted"})
    }
    return res.status(400).json({ error: "Session expired" })    
}

//Put
const updateUser = async function(req, res){
    const {_id}  = req.user;

    try {
        if(!_id){
          return  res.status(400).json({message: "Not Authorized"})
        }
        const body =req.body;
        const userUpdate = await People.updateOne({ _id }, body)
        res.status(200).json({userUpdate})

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

const resetPassword = async function(req, res){
    try {
        
        if(!req.app.locals.resetSession){
            return res.status(400).json({ error: "Session expired" })
        }
        const { username, password } = req.body;
        try {
            
            People.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            People.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false;
                                return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).json({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).json({error: error.message })
                })

        } catch (error) {
            return res.status(500).json({error: error.message })
        }

    } catch (error) {
        return res.status(401).json({error: error.message })
    }
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