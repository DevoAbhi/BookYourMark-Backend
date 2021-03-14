const path = require('path');

// Requiring dependancies 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);

const MongoDb_URI = "mongodb+srv://Abhinab:x9fBmSkYmgnhVRSe@bookyourmark.zoir8.mongodb.net/bookmarks"

const app = express();

// x9fBmSkYmgnhVRSe
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res, next) => {
    res.send("hello");
    next();
})


mongoose.connect(MongoDb_URI,
    { useUnifiedTopology: true }, { useNewUrlParser: true }
  )
  .then(result => {
    console.log("Database has been connected successfully!")
    app.listen(3000, () => {
        console.log("Server is running at port 3000")
    })
  })
  .catch(err => {
      console.log(ERR)
  })

