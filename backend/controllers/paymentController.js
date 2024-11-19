const { connectToDB } = require('../database/dbConnection');

const paymentController = {
    processPayment: (req, res) => {
        const {
            customerId,
            paymentMethod,
            cardNumber,
            giftCardNumber,
            cartItems,
            totalPrice,
        } = req.body;

        // Validate input
        if (!customerId) {
            return res.status(400).json({ error: 'Customer ID is required' });
        }
        if (!paymentMethod) {
            return res.status(400).json({ error: 'Payment method is required' });
        }
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart items are required' });
        }

        const db = connectToDB();

        // Begin a transaction
        const transaction = db.transaction(() => {
            try {
                // 1. Clear previous OrderSummary table for new order
                db.prepare(`
                    DELETE FROM OrderSummary
                    WHERE CustomerID = ?
                `).run(customerId);

                // 2. Insert payment into Payments table
                const paymentStmt = db.prepare(`
                    INSERT INTO Payments (CustomerID, PaymentMethod, CardNumber, GiftCardNumber, AmountPaid)
                    VALUES (?, ?, ?, ?, ?)
                `);
                const result = paymentStmt.run(
                    customerId,
                    paymentMethod,
                    cardNumber || null,
                    giftCardNumber || null,
                    totalPrice
                );

                const paymentId = result.lastInsertRowid;

                // 3. Insert cart items into OrderSummary table
                const orderStmt = db.prepare(`
                    INSERT INTO OrderSummary (CustomerID, PaymentMethod, ItemType, ItemName, Quantity, Cost)
                    VALUES (?, ?, ?, ?, ?, ?)
                `);

                cartItems.forEach(item => {
                    orderStmt.run(
                        customerId,
                        paymentMethod,
                        item.ItemType.trim(),
                        item.ItemName.trim(),
                        item.Quantity,
                        item.Cost
                    );
                });

                // 4. Clear the cart after payment
                db.prepare(`
                    DELETE FROM Cart
                    WHERE CustomerID = ?
                `).run(customerId);

                return paymentId;
            } catch (err) {
                throw err; // Rethrow the error to trigger transaction rollback
            }
        });

        try {
            const paymentId = transaction(); // Execute the transaction
            res.status(200).json({
                message: 'Payment processed successfully',
                paymentId,
            });
        } catch (err) {
            console.error('Error during transaction:', err);
            res.status(500).json({ error: 'Failed to process payment' });
        }
    },
};

module.exports = paymentController;
