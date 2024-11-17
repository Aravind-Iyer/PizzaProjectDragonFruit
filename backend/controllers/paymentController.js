const paymentService = require('../services/paymentService');

const paymentController = {
    processPayment: async (req, res) => {
        try {
            const {
                customerId,
                paymentMethod,
                cardNumber,
                giftCardNumber,
                cartItems,
                totalPrice,
            } = req.body;

            // Basic validation
            if (!customerId) {
                return res.status(400).json({ error: 'Customer ID is required' });
            }

            if (!paymentMethod) {
                return res.status(400).json({ error: 'Payment method is required' });
            }

            if (paymentMethod === 'Credit/Debit Card' && (!cardNumber || cardNumber.length !== 16)) {
                return res.status(400).json({ error: 'Card number must be 16 digits.' });
            }

            if (!cartItems || cartItems.length === 0) {
                return res.status(400).json({ error: 'Cart items are required' });
            }

            if (!totalPrice || totalPrice <= 0) {
                return res.status(400).json({ error: 'Invalid total price' });
            }

            // Call service to process payment
            const paymentResult = await paymentService.processPayment({
                customerId,
                paymentMethod,
                cardNumber,
                giftCardNumber,
                cartItems,
                totalPrice,
            });

            res.status(200).json({
                message: 'Payment processed successfully',
                paymentId: paymentResult.paymentId,
            });
        } catch (err) {
            console.error('Error processing payment:', err);
            res.status(500).json({ error: 'Failed to process payment' });
        }
    },
};

module.exports = paymentController;
