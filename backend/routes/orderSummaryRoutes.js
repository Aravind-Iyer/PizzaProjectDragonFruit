const express = require('express');
const router = express.Router();
const orderSummaryController = require('../controllers/orderSummaryController');

// Route to fetch the order summary
router.get('/orderSummary', orderSummaryController.getOrderSummary);

module.exports = router;
