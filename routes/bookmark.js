const express = require('express');
const router = express.Router()

const isAuthenticated = require('../middleware/auth-validate');
const bookmarkController = require('../controllers/bookmark')

// Post Routes
router.post('/create-bookmark', isAuthenticated, bookmarkController.postCreateBookmark);

// Put routes for editing
router.put('/update-bookmark', isAuthenticated, bookmarkController.putUpdateBookmark)

router.get('/view-bookmarks', isAuthenticated, bookmarkController.getBookmarks)


module.exports = router;