const express = require('express');
const router = express.Router();
const orderSummaryController = require('../controllers/orderSummaryController');


router.get('/orderSummary', orderSummaryController.getOrderSummary);

module.exports = router;
