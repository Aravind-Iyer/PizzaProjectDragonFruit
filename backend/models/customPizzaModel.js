const { connectToDB, sql } = require('../database/dbConnection');

const customPizzaModel = {
    createPizza: async (data) => {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('CustomerID', sql.Int, data.customerId)
            .input('PizzaName', sql.NVarChar(100), data.pizzaName)
            .input('Crust', sql.NVarChar(50), data.crust)
            .input('Sauce', sql.NVarChar(50), data.sauce)
            .input('Cheese', sql.NVarChar(50), data.cheese)
            .input('Size', sql.NVarChar(20), data.size)
            .input('Toppings', sql.NVarChar(sql.MAX), data.toppings.join(','))
            .input('Cost', sql.Decimal(10, 2), data.cost)
            .query(`
                INSERT INTO CustomPizza (CustomerID, PizzaName, Crust, Sauce, Cheese, Size, Toppings, Cost)
                OUTPUT Inserted.PizzaID
                VALUES (@CustomerID, @PizzaName, @Crust, @Sauce, @Cheese, @Size, @Toppings, @Cost)
            `);
        return result.recordset[0].PizzaID;
    },

    getPizzasByCustomer: async (customerId) => {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('CustomerID', sql.Int, customerId)
            .query(`
                SELECT PizzaID, PizzaName, Crust, Sauce, Cheese, Size, Toppings, Cost
                FROM CustomPizza
                WHERE CustomerID = @CustomerID
            `);
        return result.recordset;
    },

    deletePizza: async (pizzaId) => {
        const pool = await connectToDB();
        await pool.request()
            .input('PizzaID', sql.Int, pizzaId)
            .query(`DELETE FROM CustomPizza WHERE PizzaID = @PizzaID`);
    },
};

module.exports = customPizzaModel;
