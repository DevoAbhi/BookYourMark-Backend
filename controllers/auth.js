const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user');


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
        .then((result, err) => {
            if(err){
                console.log("Error: ", err)
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong while saving"
                })
            }
            console.log("User has been registered!");
            res.status(201).json({
                success: true,
                message:"User has been registered successfully"
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let fetchedUser;

    User.findOne({ email : email })
        .then(user => {
            if(!user){
                return res.status(500).json({
                    success: false,
                    message: "User not found"
                })
            }
            fetchedUser = user;

            return bcrypt.compare(password, user.password)
        })
            .then(isMatching => {
                if(!isMatching) {
                    return res.status(401).json({
                        success: false,
                        message: "Password does not match"
                    })
                }

                const token = jwt.sign(
                    {
                        email: fetchedUser.email,
                        user_id: fetchedUser._id
                    },
                    process.env.JWT_KEY,
                    { expiresIn: '1hr' }
                );

                res.status(200).json({
                    token: token,
                    expiresIn: 3600
                })
            })
            .catch(err => {
                return res.status(401).json({
                    message: 'Something went wrong decripting password'
                })
            })

        }

        // npm run test --if-present