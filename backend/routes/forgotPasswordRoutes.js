
const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

router.post('/forgotPassword', forgotPasswordController.handleForgotPassword);

module.exports = router;
