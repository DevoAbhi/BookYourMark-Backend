const express = require('express')
const router = express.Router();

usersController = require('../controllers/users')

router.get('/', usersController.getAllUsers)


module.exports = router;