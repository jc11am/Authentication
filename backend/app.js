require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const router = require("./routes/route")


const app = express();

//middleware
app.use(express.json())
app.use(cors)
app.use(morgan("tiny"))

//Route
app.use("/api", router)



const PORT = process.env.Port

mongoose.set("strictQuery", true)

mongoose.connect(process.env.Database)
    .then(function(){
        app.listen(PORT || 4000, function(){
            console.log("success")
        })
    })
    .catch(function(error){
        console.log(error.message)
    })