const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

// Service function to get all menu options
const getMenuOptions = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .query(`
        SELECT * FROM Pizza;          -- Selecting base pizzas (only for custom options)
        SELECT * FROM Options;        -- Topping options, crusts, etc.
        SELECT * FROM Beverages;      -- Beverage options
        SELECT * FROM Sides;          -- Side items
      `);

        return {
            pizzas: result.recordsets[0],    // Custom pizzas base options
            options: result.recordsets[1],   // Options (e.g., crusts, toppings)
            beverages: result.recordsets[2], // Available beverages
            sides: result.recordsets[3],     // Available sides
        };
    } catch (error) {
        throw new Error('Database query failed');
    }
};

module.exports = {
    getMenuOptions,
};
