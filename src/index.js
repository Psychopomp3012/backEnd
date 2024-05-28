const { log } = require("console");
require('dotenv').config()
console.log(process.env)
const port = 4000;
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

// because its default name is views
const tempelatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
// hbs is our view engine
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({extended: false}))

// "/" means default
app.get("/", (request, response) => {
    response.render("login");
})

app.get("/signup", (request, response) => {
    response.render("signup");
})

app.post("/signup", async (request, response) => {
    const data = {
        name: request.body.name,
        password: request.body.password
    }

    await collection.insertMany([data])

    response.render("home")
})

app.post("/login", async (request, response) => {
    
    try {
        const check = await collection.findOne({name: request.body.name})

        if (check.password === request.body.password) {
            response.render("home")
        }
        else {
            response.send("Wrong Password");
        }
    }
    
    catch {
        response.send("Wrong Details");
    }
})

// 3000 is the port
app.listen(process.env.PORT, () => {
    console.log(`port connected: ${PORT}`);
})