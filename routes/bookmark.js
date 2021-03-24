const express = require('express');
const router = express.Router()

const isAuthenticated = require('../middleware/auth-validate');
const bookmarkController = require('../controllers/bookmark')

// Post Routes
router.post('/create-bookmark', isAuthenticated, bookmarkController.postCreateBookmark);

// Put routes for editing bookmark
router.put('/update-bookmark', isAuthenticated, bookmarkController.putUpdateBookmark)

// delete route for deleting bookmark 
router.delete('/delete-bookmark', isAuthenticated, bookmarkController.deleteBookmark)

router.get('/view-bookmarks', isAuthenticated, bookmarkController.getBookmarks)


module.exports = router;