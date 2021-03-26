const path = require('path');

// Requiring dependancies 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);

const MongoDb_URI = "mongodb+srv://Abhinab:" + process.env.MONGO_ATLAS_PW + "@bookyourmark.zoir8.mongodb.net/bookmarks"

const app = express();
// const store_session = new MongoDBSession({
//   uri: MongoDb_URI,
//   collection: 'sessions'
// })

// Routes imports
const authRoutes = require('./routes/auth');
const folderRoutes = require('./routes/folders');
const bookmarkRoutes = require('./routes/bookmark');
const usersRoute = require('./routes/users')
const User = require('./models/user');

// x9fBmSkYmgnhVRSe
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   session({
//     secret: 'This is a bookmark app',
//     resave: false,
//     saveUninitialized: false,
//     store: store_session
//   })
// )

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-AUTH-TOKEN");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE,OPTIONS");
  
    next();
});

app.use('/user',authRoutes);
app.use('/folder',folderRoutes);
app.use('/bookmark',bookmarkRoutes);
app.use(usersRoute)


mongoose.connect(MongoDb_URI,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(result => {
    console.log("Database has been connected successfully!")
    
  })
  .catch(err => {
    console.log("Could not connect to the Database!")
    console.log(err)
  })


module.exports = app

// app.listen(3000, () => {
//   console.log("Server is running at port 3000")
// })
