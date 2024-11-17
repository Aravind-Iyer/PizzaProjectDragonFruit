const customPizzaService = require('../services/customPizzaService');
const cartService = require('../services/cartService');

const customPizzaController = {
    createPizza: async (req, res) => {
        const { customerId, pizzaName, crust, sauce, cheese, size, toppings, cost } = req.body;
        try {
            // to table for faviored page later useagae
            const pizzaId = await customPizzaService.createPizza({
                customerId,
                pizzaName,
                crust,
                sauce,
                cheese,
                size,
                toppings,
                cost,
            });

            // to cart
            await cartService.addToCart({
                customerId,
                itemId: pizzaId,
                itemType: `${size} Pizza`,
                itemName: pizzaName,
                quantity: 1, // Default quantity
                cost,
            });

            res.status(201).json({ message: 'Pizza created and added to cart successfully', pizzaId });
        } catch (err) {
            console.error('Error creating pizza and adding to cart:', err);
            res.status(500).json({ message: 'Error creating pizza and adding to cart' });
        }
    },

    getPizzasByCustomer: async (req, res) => {
        const { customerId } = req.query;
        try {
            const pizzas = await customPizzaService.getPizzasByCustomer(customerId);
            res.status(200).json(pizzas);
        } catch (err) {
            console.error('Error fetching pizzas:', err);
            res.status(500).json({ message: 'Error fetching pizzas' });
        }
    },

    deletePizza: async (req, res) => {
        const { pizzaId } = req.body;
        try {
            await customPizzaService.deletePizza(pizzaId);
            res.status(200).json({ message: 'Pizza deleted successfully' });
        } catch (err) {
            console.error('Error deleting pizza:', err);
            res.status(500).json({ message: 'Error deleting pizza' });
        }
    },
};

module.exports = customPizzaController;
