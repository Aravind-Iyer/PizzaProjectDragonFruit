const { connectToDB, sql } = require('../database/dbConnection');

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

            const pool = await connectToDB();

            // Start a database transaction
            const transaction = new sql.Transaction(pool);
            await transaction.begin();

            try {
                // 1. Clear previous `OrderSummary` data for this customer
                await transaction.request()
                    .input('CustomerID', sql.Int, customerId)
                    .query(`
                        DELETE FROM OrderSummary
                        WHERE CustomerID = @CustomerID
                    `);
                // Insert payment into Payments table
                const paymentResult = await transaction.request()
                    .input('CustomerID', sql.Int, customerId)
                    .input('PaymentMethod', sql.VarChar(50), paymentMethod)
                    .input('CardNumber', sql.Char(16), cardNumber || null)
                    .input('GiftCardNumber', sql.VarChar(50), giftCardNumber || null)
                    .input('AmountPaid', sql.Decimal(10, 2), totalPrice)
                    .query(`
                        INSERT INTO Payments (CustomerID, PaymentMethod, CardNumber, GiftCardNumber, AmountPaid)
                        OUTPUT INSERTED.PaymentID
                        VALUES (@CustomerID, @PaymentMethod, @CardNumber, @GiftCardNumber, @AmountPaid)
                    `);

                const paymentId = paymentResult.recordset[0].PaymentID;

                // Insert cart items into OrderSummary table
                for (const item of cartItems) {
                    await transaction.request()
                        .input('CustomerID', sql.Int, customerId)
                        .input('paymentMethod', sql.VarChar(50), paymentMethod)
                        .input('ItemType', sql.VarChar(50), item.ItemType.trim())
                        .input('ItemName', sql.VarChar(100), item.ItemName.trim())
                        .input('Quantity', sql.Int, item.Quantity)
                        .input('Cost', sql.Decimal(10, 2), item.Cost)
                        .query(`
                            INSERT INTO OrderSummary (CustomerID, paymentMethod, ItemType, ItemName, Quantity, Cost)
                            VALUES (@CustomerID, @paymentMethod, @ItemType, @ItemName, @Quantity, @Cost)
                        `);
                }

                // Clear the cart
                await transaction.request()
                    .input('CustomerID', sql.Int, customerId)
                    .query(`DELETE FROM Cart WHERE CustomerID = @CustomerID`);

                // Commit the transaction
                await transaction.commit();

                res.status(200).json({
                    message: 'Payment processed successfully',
                    paymentId,
                });
            } catch (err) {
                // Rollback the transaction if an error occurs
                await transaction.rollback();
                console.error('Error during transaction:', err);
                res.status(500).json({ error: 'Failed to process payment' });
            }
        } catch (err) {
            console.error('Error processing payment:', err);
            res.status(500).json({ error: 'An error occurred during payment processing' });
        }
    },
};

module.exports = paymentController;
