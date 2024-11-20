const { connectToDB } = require('../database/dbConnection');
const sql = require('mssql');

const paymentService = {
    processPayment: async ({
                               customerId,
                               paymentMethod,
                               cardNumber,
                               giftCardNumber,
                               cartItems,
                               totalPrice,
                           }) => {
        const pool = await connectToDB();

        try {

            const transaction = new sql.Transaction(pool);
            await transaction.begin();

            // Insert payment record
            const paymentResult = await transaction.request()
                .input('CustomerID', sql.Int, customerId)
                .input('PaymentMethod', sql.VarChar(50), paymentMethod)
                .input('CardNumber', sql.Char(16), cardNumber || null) // Mock card numbers allowed
                .input('GiftCardNumber', sql.VarChar(50), giftCardNumber || null)
                .input('AmountPaid', sql.Decimal(10, 2), totalPrice)
                .query(`
                    INSERT INTO Payments (CustomerID, PaymentMethod, CardNumber, GiftCardNumber, AmountPaid)
                    OUTPUT INSERTED.PaymentID
                    VALUES (@CustomerID, @PaymentMethod, @CardNumber, @GiftCardNumber, @AmountPaid)
                `);

            const paymentId = paymentResult.recordset[0].PaymentID;

            // Insert cart items into PaymentItems
            for (const item of cartItems) {
                await transaction.request()
                    .input('PaymentID', sql.Int, paymentId)
                    .input('ItemID', sql.Int, item.ItemID)
                    .input('ItemName', sql.VarChar(100), item.ItemName.trim())
                    .input('Quantity', sql.Int, item.Quantity)
                    .input('Cost', sql.Decimal(10, 2), item.Cost)
                    .query(`
                        INSERT INTO PaymentItems (PaymentID, ItemID, ItemName, Quantity, Cost)
                        VALUES (@PaymentID, @ItemID, @ItemName, @Quantity, @Cost)
                    `);
            }

            await transaction.request()
                .input('CustomerID', sql.Int, customerId)
                .query(`
                    DELETE FROM Cart
                    WHERE CustomerID = @CustomerID
                `);


            await transaction.commit();

            return { paymentId };
        } catch (err) {
            console.error('Error processing payment in service:', err);


            if (transaction) await transaction.rollback();
            throw err;
        }
    },
};

module.exports = paymentService;
