const db = require('../services/menuService'); // Replace with actual service to interact with database

// Function to get menu options
exports.getMenuOptions = async (req, res) => {
    try {
        const menuOptions = await db.getMenuOptions();
        res.status(200).json(menuOptions);
    } catch (error) {
        console.error('Failed to get menu options:', error);
        res.status(500).json({ message: 'Failed to fetch menu options.' });
    }
};

// Function to add an order to the cart
exports.addOrderToCart = async (req, res) => {
    try {
        const order = req.body;  // Extract the order from the request body
        console.log('Received order:', order);

        // Validate if customerID is provided
        if (!order.customerID) {
            return res.status(400).json({ message: 'CustomerID is required to place an order.' });
        }

        // Save the order to the database (implement this in your database service)
        await db.addOrder(order);

        res.status(201).json({ message: 'Order added to cart successfully!' });
    } catch (error) {
        console.error('Failed to add order:', error);
        res.status(500).json({ message: 'Failed to add order to cart.' });
    }
};
