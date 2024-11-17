const express = require('express');
const router = express.Router();
const customPizzaController = require('../controllers/customPizzaController');

// Routes for Custom Pizza
router.post('/custom-pizza', customPizzaController.createPizza); // Create a pizza
router.get('/custom-pizza', customPizzaController.getPizzasByCustomer); // Get pizzas by customer
router.delete('/custom-pizza', customPizzaController.deletePizza); // Delete a pizza

module.exports = router;
