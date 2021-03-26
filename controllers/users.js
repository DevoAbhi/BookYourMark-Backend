const User = require('../models/user');

exports.getAllUsers = async (req, res, next) => {
    try {
        User.find()
        .then(users => {
            res.status(200).json({
                users: users
            })
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong when getting all folders!"
        })
    }
}