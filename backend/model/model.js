const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

 const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});

UserSchema.statics.register = async function(email, password, username, profile) {

    if(!email || !username || !password){
        throw Error("All fields are required")
    }
    if(password.length < 4) {
        throw Error("Password must not be less than 4 characters")
    }
    //Check if username exist
    const checkUsername = await this.findOne({ username })
    if(checkUsername){
        throw Error("Username is already in use")  
    }
    //Check if email exist
    const checkEmail = await this.findOne({ email })
    if(checkEmail){
        throw Error("Email is already in use")  
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash( password, salt)

    const newUser = await this.create( {email, username, password: hash, profile} )

    return newUser

}

const People = mongoose.model("People", UserSchema);

module.exports = People;
