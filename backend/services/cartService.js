const { connectToDB, sql } = require('../database/dbConnection');

const cartService = {
    // Fetch all cart items for a customer
    getCart: async (customerId) => {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('CustomerID', sql.Int, customerId)
            .query(`
                SELECT CartID, ItemID, ItemType, ItemName, Quantity, Cost, (Quantity * Cost) AS Total
                FROM Cart
                WHERE CustomerID = @CustomerID
            `);
        return result.recordset;
    },

    // Add an item to the cart
    addToCart: async ({ customerId, itemId, itemType, itemName, quantity, cost }) => {
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
    },

    // Update cart item quantity
    updateCart: async (cartId, quantity) => {
        const pool = await connectToDB();
        await pool.request()
            .input('CartID', sql.Int, cartId)
            .input('Quantity', sql.Int, quantity)
            .query(`
                UPDATE Cart
                SET Quantity = @Quantity
                WHERE CartID = @CartID
            `);
    },

    // Remove an item from the cart
    removeFromCart: async (cartId) => {
        const pool = await connectToDB();
        await pool.request()
            .input('CartID', sql.Int, cartId)
            .query(`DELETE FROM Cart WHERE CartID = @CartID`);
    },

    // Clear the cart for a customer
    clearCart: async (customerId) => {
        const pool = await connectToDB();
        await pool.request()
            .input('CustomerID', sql.Int, customerId)
            .query(`DELETE FROM Cart WHERE CustomerID = @CustomerID`);
    },
};

module.exports = cartService;
