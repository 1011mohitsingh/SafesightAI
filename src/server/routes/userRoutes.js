const express = require('express');
const { registerUser, authUser, forgotPassword, resetPassword} = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;