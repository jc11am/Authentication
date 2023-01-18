const jwt = require("jsonwebtoken")
const People = require("../model/model")

const updateAuth = async function(req, res, next){
    const { authorization } = req.headers

    if(!authorization){
        return res.status(400).json({message: "Not Authenticated"})
    }

    const token = authorization.split(" ")[1]

    try {
        const {_id} = jwt.verify(token, process.env.Secret)
        req.user = await People.findOne({_id}).select("_id")
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: error.message})
    }
}

const localVariables = function (req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}

module.exports = {
    updateAuth,
    localVariables
}