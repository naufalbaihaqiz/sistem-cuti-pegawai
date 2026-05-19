const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireLogin } = require('../middlewares/authMiddleware');

router.get('/login', authController.renderLogin);
router.post('/login', authController.login);
router.get('/logout', requireLogin, authController.logout);

module.exports = router;