const express = require('express');
const router = express.Router();
const dessertController = require('../controllers/dessertController');

// Get all desserts
router.get('/desserts', dessertController.getAllDesserts);

module.exports = router;
