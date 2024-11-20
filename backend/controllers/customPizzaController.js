const { connectToDB } = require('../database/dbConnection');

const customPizzaController = {
    createPizza: (req, res) => {
        const { customerId, pizzaName, crust, sauce, cheese, size, toppings, cost } = req.body;

        if (!customerId || !pizzaName || !crust || !sauce || !cheese || !size || !toppings || !cost) {
            return res.status(400).json({ message: 'All fields are required to create a pizza' });
        }

        try {
            const db = connectToDB();

            const toppingsString = Array.isArray(toppings) ? toppings.join(',') : toppings;
            // Insert the pizza into the CustomPizza table
            const pizzaQuery = `
                INSERT INTO CustomPizza (CustomerID, PizzaName, Crust, Sauce, Cheese, Size, Toppings, Cost)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const pizzaResult = db.prepare(pizzaQuery).run(customerId, pizzaName, crust, sauce, cheese, size, toppingsString, cost);

            const pizzaId = pizzaResult.lastInsertRowid;

            // Add the pizza to the cart
            const cartQuery = `
                INSERT INTO Cart (CustomerID, ItemID, ItemType, ItemName, Quantity, Cost)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.prepare(cartQuery).run(
                customerId,
                pizzaId,
                `${size} Pizza`,
                pizzaName,
                1,
                cost
            );

            res.status(201).json({ message: 'Pizza created and added to cart successfully', pizzaId });
        } catch (err) {
            console.error('Error creating pizza and adding to cart:', err);
            res.status(500).json({ message: 'Error creating pizza and adding to cart' });
        }
    },

    getPizzasByCustomer: (req, res) => {
        const { customerId } = req.query;

        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        try {
            const db = connectToDB();

            const query = `
                SELECT * FROM CustomPizza WHERE CustomerID = ?
            `;
            const pizzas = db.prepare(query).all(customerId);

            res.status(200).json(pizzas);
        } catch (err) {
            console.error('Error fetching pizzas:', err);
            res.status(500).json({ message: 'Error fetching pizzas' });
        }
    },

    deletePizza: (req, res) => {
        const { pizzaId } = req.body;

        if (!pizzaId) {
            return res.status(400).json({ message: 'Pizza ID is required' });
        }

        try {
            const db = connectToDB();


            const deletePizzaQuery = `
                DELETE FROM CustomPizza WHERE PizzaID = ?
            `;
            db.prepare(deletePizzaQuery).run(pizzaId);


            const deleteCartQuery = `
                DELETE FROM Cart WHERE ItemID = ?
            `;
            db.prepare(deleteCartQuery).run(pizzaId);

            res.status(200).json({ message: 'Pizza deleted successfully' });
        } catch (err) {
            console.error('Error deleting pizza:', err);
            res.status(500).json({ message: 'Error deleting pizza' });
        }
    },
};

module.exports = customPizzaController;
