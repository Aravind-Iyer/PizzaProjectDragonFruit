const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.put('/cart', cartController.updateCart);
router.delete('/cart', cartController.removeFromCart);
router.delete('/cart/clear', cartController.clearCart);


module.exports = router;
