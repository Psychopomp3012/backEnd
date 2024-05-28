const mongoose = require("mongoose");

// connects you to mongoDB database to node.js
mongoose.connect("mongodb+srv://Psychopomp3012:iamgroot@cluster0.v5td1i8.mongodb.net/database1")
.then(() => {
    console.log("mongoDB connected");
})
.catch(() => {
    console.log("failed to connect");
})

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requied: true
    }
})

const collection = new mongoose.model("Collection1", logInSchema)

module.exports = collection