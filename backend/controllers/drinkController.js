const { connectToDB, sql } = require('../database/dbConnection');

// Controller for Drink Operations
const drinkController = {
    // Get all drinks
    getAllDrinks: async (req, res) => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query(`
            SELECT
                DrinkID,
                RTRIM(DrinkName) AS DrinkName, -- Trim trailing spaces
                Cost,
                RTRIM(ImageURL) AS ImageURL -- Trim trailing spaces
            FROM Drinks
        `);
            console.log('Fetched Drinks:', result.recordset); // Log fetched data
            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching drinks:', err);
            res.status(500).json({ message: 'Error fetching drinks' });
        }
    }
};

module.exports = drinkController;
