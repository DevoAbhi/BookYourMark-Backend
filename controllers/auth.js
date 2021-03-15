const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

    User.findOne({ email : email })
        .then(user => {
            if(!user){
                return res.status(500).json({
                    success: false,
                    message: "User not found"
                })
            }

            bcrypt.compare(password, user.password)
                .then(isMatching => {
                    if(!isMatching) {
                        return res.status(401).json({
                            success: false,
                            message: "Password does not match"
                        })
                    }

                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        'secret_which_I_have_kept_small_but_has_to_be_longer',
                        { expiresIn: '1hr' }
                    )

                    res.status(200).json({
                        token: token
                    })
                })
                .catch(err => {
                    return res.status(401).json({
                        message: 'Something went wrong decripting password'
                    })
                })

        })
        .catch(err => {
            return res.status(401).json({
                message: 'Something went wrong'
            })
        })

}