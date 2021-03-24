const express = require('express')
const router = express.Router();
const isAuthenticated = require('../middleware/auth-validate');
const foldersController = require('../controllers/folders')


// Post routes
router.post('/create-folder', isAuthenticated, foldersController.postCreateFolder)
router.post('/rename-folder', isAuthenticated, foldersController.postRenameFolder)
router.delete('/delete-folder', isAuthenticated, foldersController.postDeleteFolder)

// Get routes
router.get('/view-folders',isAuthenticated, foldersController.getFolders)



module.exports = router;