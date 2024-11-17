const customPizzaModel = require('../models/customPizzaModel');

const customPizzaService = {
    createPizza: async (data) => {
        return await customPizzaModel.createPizza(data);
    },

    getPizzasByCustomer: async (customerId) => {
        return await customPizzaModel.getPizzasByCustomer(customerId);
    },

    deletePizza: async (pizzaId) => {
        await customPizzaModel.deletePizza(pizzaId);
    },
};

module.exports = customPizzaService;
