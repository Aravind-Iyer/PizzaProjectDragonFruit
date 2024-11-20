const express = require('express');
const router = express.Router();
const dessertController = require('../controllers/dessertController');


router.get('/desserts', dessertController.getAllDesserts);

module.exports = router;
