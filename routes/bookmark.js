const express = require('express');
const router = express.Router()

const isAuthenticated = require('../middleware/auth-validate');
const bookmarkController = require('../controllers/bookmark')

// Post Routes
router.post('/create-bookmark', isAuthenticated, bookmarkController.postCreateBookmark);
router.get('/view-bookmarks', isAuthenticated, bookmarkController.getBookmarks)


module.exports = router;