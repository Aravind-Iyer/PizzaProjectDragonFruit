const { connectToDB, sql } = require('../database/dbConnection');

const dessertService = {
    getDesserts: async () => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query('SELECT * FROM Desserts');
            return result.recordset;
        } catch (err) {
            console.error('Error in dessertService:', err);
            throw err;
        }
    }
};

module.exports = dessertService;
