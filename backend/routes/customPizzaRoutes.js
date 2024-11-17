const express = require('express');
const router = express.Router();
const customPizzaController = require('../controllers/customPizzaController');

// Routes for Custom Pizza
router.post('/custom-pizza', customPizzaController.createPizza);
router.get('/custom-pizza', customPizzaController.getPizzasByCustomer);
router.delete('/custom-pizza', customPizzaController.deletePizza);

module.exports = router;
