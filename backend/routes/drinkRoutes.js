const express = require('express');
const router = express.Router();
const drinkController = require('../controllers/drinkController');

// Get all drinks
router.get('/drinks', drinkController.getAllDrinks);

module.exports = router;
