const path = require('path');

// Requiring dependancies 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res, next) => {
    res.send("hello");
    next();
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})