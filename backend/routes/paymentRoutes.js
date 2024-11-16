const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to process a payment
router.post('/payments', paymentController.processPayment);

module.exports = router;
