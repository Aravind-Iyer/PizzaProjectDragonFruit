const express = require('express');
const router = express.Router();
const sidesController = require('../controllers/sidesController');

// Get all sides
router.get('/sides', sidesController.getAllSides);

module.exports = router;
