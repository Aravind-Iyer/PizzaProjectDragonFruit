const express = require('express');
const router = express.Router();
const sidesController = require('../controllers/sidesController');


router.get('/sides', sidesController.getAllSides);

module.exports = router;
