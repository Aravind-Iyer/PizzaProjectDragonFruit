const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Routes
router.get('/cart', cartController.getCart); // Fetch cart items
router.post('/cart', cartController.addToCart); // Add to cart
router.put('/cart', cartController.updateCart); // Update cart item
router.delete('/cart', cartController.removeFromCart); // Remove from cart

module.exports = router;
