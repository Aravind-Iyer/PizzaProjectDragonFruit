const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

// GET all menu options (sizes, crusts, sauces, toppings, beverages)
router.get('/options', menuController.getMenuOptions);

module.exports = router;
