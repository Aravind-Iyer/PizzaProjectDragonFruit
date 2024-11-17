const { connectToDB, sql } = require('../database/dbConnection');

const orderSummaryController = {
    getOrderSummary: async (req, res) => {
        const { customerId } = req.query;

        try {
            const pool = await connectToDB();
            const result = await pool.request()
                .input('CustomerID', sql.Int, customerId)
                .query(`
                    SELECT ItemType, ItemName, Quantity, Cost, PaymentMethod, OrderDate
                    FROM OrderSummary
                    WHERE CustomerID = @CustomerID
                    ORDER BY OrderDate DESC
                `);

            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching order summary:', err);
            res.status(500).json({ message: 'Error fetching order summary' });
        }
    },
};

module.exports = orderSummaryController;
