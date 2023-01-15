const People = require("../model/model")

const userAuth = async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await People.findOne({ username });
        if(!exist) return res.status(400).json({ message : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}

module.exports = userAuth