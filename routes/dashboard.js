const express = require('express')
const router = express.Router();
const isAuthenticated = require('../middleware/auth-validate');
const dashboardController = require('../controllers/dashboard')

router.post('/create-folder', isAuthenticated, dashboardController.postCreateFolder)

module.exports = router;