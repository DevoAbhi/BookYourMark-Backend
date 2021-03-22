const express = require('express');
const router = express.Router()

const isAuthenticated = require('../middleware/auth-validate');
const bookmarkController = require('../controllers/bookmark')

// Post Routes
router.post('/create-bookmark', isAuthenticated, bookmarkController.postCreateBookmark)


module.exports = router;