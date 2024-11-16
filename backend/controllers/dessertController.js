const { connectToDB, sql } = require('../database/dbConnection');

// Controller for Dessert Operations
const dessertController = {
    // Get all desserts
    getAllDesserts: async (req, res) => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query(`
            SELECT
                DessertID,
                RTRIM(DessertName) AS DessertName, -- Trim trailing spaces
                Cost,
                RTRIM(ImageURL) AS ImageURL -- Trim trailing spaces
            FROM Desserts
        `);
            console.log('Fetched Desserts:', result.recordset); // Log fetched data
            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching desserts:', err);
            res.status(500).json({ message: 'Error fetching desserts' });
        }
    }
};

module.exports = dessertController;
