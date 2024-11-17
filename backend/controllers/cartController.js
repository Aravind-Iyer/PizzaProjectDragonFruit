const { connectToDB, sql } = require('../database/dbConnection');
const cartService = require('../services/cartService');

const cartController = {
    // 1. Fetch all cart items for a specific customer
    getCart: async (req, res) => {
        const { customerId } = req.query;
        try {
            console.log('Fetching cart for customer:', customerId);
            const pool = await connectToDB();
            const result = await pool.request()
                .input('CustomerID', sql.Int, customerId)
                .query(`
                SELECT CartID, ItemID, ItemType, ItemName, Quantity, Cost, (Quantity * Cost) AS Total
                FROM Cart
                WHERE CustomerID = @CustomerID
            `);
            console.log('Cart items fetched:', result.recordset);
            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching cart items:', err);
            res.status(500).json({ message: 'Error fetching cart items' });
        }
    },

    // 2. Add to cart.........
    addToCart: async (req, res) => {
        const { customerId, itemId, itemType, itemName, quantity, cost } = req.body;
        try {
            const pool = await connectToDB();
            await pool.request()
                .input('CustomerID', sql.Int, customerId)
                .input('ItemID', sql.Int, itemId)
                .input('ItemType', sql.Char(50), itemType)
                .input('ItemName', sql.Char(100), itemName)
                .input('Quantity', sql.Int, quantity)
                .input('Cost', sql.Decimal(10, 2), cost)
                .query(`
                    INSERT INTO Cart (CustomerID, ItemID, ItemType, ItemName, Quantity, Cost)
                    VALUES (@CustomerID, @ItemID, @ItemType, @ItemName, @Quantity, @Cost)
                `);
            res.status(201).json({ message: 'Item added to cart' });
        } catch (err) {
            console.error('Error adding to cart:', err);
            res.status(500).json({ message: 'Error adding to cart' });
        }
    },

    // 3. Update cart...............
    updateCart: async (req, res) => {
        const { cartId, quantity } = req.body;
        try {
            const pool = await connectToDB();
            await pool.request()
                .input('CartID', sql.Int, cartId)
                .input('Quantity', sql.Int, quantity)
                .query(`
                    UPDATE Cart
                    SET Quantity = @Quantity
                    WHERE CartID = @CartID
                `);
            res.status(200).json({ message: 'Cart updated successfully' });
        } catch (err) {
            console.error('Error updating cart:', err);
            res.status(500).json({ message: 'Error updating cart' });
        }
    },

    // 4. Remove an item ....
    removeFromCart: async (req, res) => {
        const { cartId } = req.body;
        try {
            const pool = await connectToDB();
            await pool.request()
                .input('CartID', sql.Int, cartId)
                .query(`
                    DELETE FROM Cart WHERE CartID = @CartID
                `);
            res.status(200).json({ message: 'Item removed from cart' });
        } catch (err) {
            console.error('Error removing from cart:', err);
            res.status(500).json({ message: 'Error removing from cart' });
        }
    },
    // Clear all items
    clearCart: async (req, res) => {
        const { customerId } = req.body;
        try {
            const pool = await connectToDB();
            await pool.request()
                .input('CustomerID', sql.Int, customerId)
                .query(`
                DELETE FROM Cart WHERE CustomerID = @CustomerID
            `);
            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (err) {
            console.error('Error clearing cart:', err);
            res.status(500).json({ message: 'Error clearing cart' });
        }
    }
};

module.exports = cartController;
