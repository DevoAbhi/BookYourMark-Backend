const express = require('express')
const router = express.Router();
const isAuthenticated = require('../middleware/auth-validate');
const foldersController = require('../controllers/folders')

router.post('/create-folder', isAuthenticated, foldersController.postCreateFolder)

router.get('/view-folders', isAuthenticated, foldersController.getFolders)

router.put('/rename-folder', isAuthenticated)



module.exports = router;