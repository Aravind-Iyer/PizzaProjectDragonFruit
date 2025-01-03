const { connectToDB } = require('../database/dbConnection');

const orderSummaryController = {
    getOrderSummary: (req, res) => {
        const { customerId } = req.query;

        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        try {
            const db = connectToDB();
            const query = `
                SELECT 
                    ItemType, 
                    ItemName, 
                    Quantity, 
                    Cost, 
                    PaymentMethod, 
                    OrderDate,
                    DeliveryOption  
                FROM OrderSummary
                WHERE CustomerID = ?
                ORDER BY OrderDate DESC
            `;

            const orderSummary = db.prepare(query).all(customerId);

            res.status(200).json(orderSummary);
        } catch (err) {
            console.error('Error fetching order summary:', err);
            res.status(500).json({ message: 'Error fetching order summary' });
        }
    },
};

module.exports = orderSummaryController;
