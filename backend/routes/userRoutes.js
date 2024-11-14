const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Log to debug which functions are undefined
console.log('userController:', userController);

// Login Route
router.post('/login', userController.login);

// Create Account Route
router.post('/create-account', userController.createAccount);

// Get Account Information Route
router.get('/account-info', userController.getAccountInfo);

// Update Account Information Route
router.put('/account-info', userController.updateAccountInfo);

// Delete Account Route
router.delete('/account-info', userController.deleteAccount);

module.exports = router;
