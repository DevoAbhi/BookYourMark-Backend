const bcrypt = require('bcryptjs')

const User = require('../models/user')


exports.postSignUp = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email}, (err, user) => {
        if(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
        if(user){
            return res.status(500).json({
                success: false,
                message:"User is already registered"
            })
        }

        return bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                folders:[]
            })

            return user.save();
        })
        .then((err, result) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong while saving"
                })
            }
            console.log("User has been registered!");
            res.status(200).json({
                success: true,
                message:"User has been registered successfully"
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
}
