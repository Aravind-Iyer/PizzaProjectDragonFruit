const { connectToDB, sql } = require('../database/dbConnection');

const drinkService = {
    getDrinks: async () => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query('SELECT * FROM Drinks');
            return result.recordset;
        } catch (err) {
            console.error('Error in drinkService:', err);
            throw err;
        }
    }
};

module.exports = drinkService;
