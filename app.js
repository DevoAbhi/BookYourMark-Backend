const path = require('path');

// Requiring dependancies 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);

const MongoDb_URI = "mongodb+srv://Abhinab:x9fBmSkYmgnhVRSe@bookyourmark.zoir8.mongodb.net/bookmarks"

const app = express();
const store_session = new MongoDBSession({
  uri: MongoDb_URI,
  collection: 'sessions'
})

// Routes imports
const authRoutes = require('./routes/auth');
const User = require('./models/user');

// x9fBmSkYmgnhVRSe
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: 'This is a bookmark app',
    resave: false,
    saveUninitialized: false,
    store: store_session
  })
)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE,OPTIONS, Authorization");
  
    next();
});

app.use(authRoutes);


mongoose.connect(MongoDb_URI,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(result => {
    console.log("Database has been connected successfully!")
    app.listen(3000, () => {
        console.log("Server is running at port 3000")
    })
  })
  .catch(err => {
    console.log("Could not connect to the Database!")
    console.log(err)
  })


