const { connectToDB } = require('../database/dbConnection');

const cartController = {
    // 1. Fetch all cart items for a specific customer
    getCart: (req, res) => {
        const { customerId } = req.query;

        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        try {
            const db = connectToDB();
            const query = `
                SELECT 
                    CartID, 
                    ItemID, 
                    ItemType, 
                    ItemName, 
                    Quantity, 
                    Cost, 
                    (Quantity * Cost) AS Total
                FROM Cart
                WHERE CustomerID = ?
            `;

            const cartItems = db.prepare(query).all(customerId);
            console.log('Cart items fetched:', cartItems);
            res.status(200).json(cartItems);
        } catch (err) {
            console.error('Error fetching cart items:', err);
            res.status(500).json({ message: 'Error fetching cart items' });
        }
    },

    // 2. Add to cart
    addToCart: (req, res) => {
        const { customerId, itemId, itemType, itemName, quantity, cost } = req.body;

        if (!customerId || !itemId || !itemType || !itemName || !quantity || !cost) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const db = connectToDB();
            const query = `
                INSERT INTO Cart (CustomerID, ItemID, ItemType, ItemName, Quantity, Cost)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.prepare(query).run(customerId, itemId, itemType, itemName, quantity, cost);
            res.status(201).json({ message: 'Item added to cart' });
        } catch (err) {
            console.error('Error adding to cart:', err);
            res.status(500).json({ message: 'Error adding to cart' });
        }
    },

    // 3. Update cart
    updateCart: (req, res) => {
        const { cartId, quantity } = req.body;

        if (!cartId || quantity == null) {
            return res.status(400).json({ message: 'Cart ID and quantity are required' });
        }

        try {
            const db = connectToDB();
            const query = `
                UPDATE Cart
                SET Quantity = ?
                WHERE CartID = ?
            `;

            const changes = db.prepare(query).run(quantity, cartId).changes;

            if (changes === 0) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            res.status(200).json({ message: 'Cart updated successfully' });
        } catch (err) {
            console.error('Error updating cart:', err);
            res.status(500).json({ message: 'Error updating cart' });
        }
    },

    // 4. Remove an item
    removeFromCart: (req, res) => {
        const { cartId } = req.body;

        if (!cartId) {
            return res.status(400).json({ message: 'Cart ID is required' });
        }

        try {
            const db = connectToDB();
            const query = `
                DELETE FROM Cart WHERE CartID = ?
            `;

            const changes = db.prepare(query).run(cartId).changes;

            if (changes === 0) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            res.status(200).json({ message: 'Item removed from cart' });
        } catch (err) {
            console.error('Error removing from cart:', err);
            res.status(500).json({ message: 'Error removing from cart' });
        }
    },

    // 5. Clear all items
    clearCart: (req, res) => {
        const { customerId } = req.body;

        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        try {
            const db = connectToDB();
            const query = `
                DELETE FROM Cart WHERE CustomerID = ?
            `;

            db.prepare(query).run(customerId);
            res.status(200).json({ message: 'Cart cleared successfully' });
        } catch (err) {
            console.error('Error clearing cart:', err);
            res.status(500).json({ message: 'Error clearing cart' });
        }
    },
};

module.exports = cartController;
