const { connectToDB, sql } = require('../database/dbConnection');

// Controller for Dessert Operations
const dessertController = {
    // Get all thee desserts
    getAllDesserts: async (req, res) => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query(`
            SELECT
                DessertID,
                RTRIM(DessertName) AS DessertName, 
                Cost,
                RTRIM(ImageURL) AS ImageURL 
            FROM Desserts
        `);
            console.log('Fetched Desserts:', result.recordset);
            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching desserts:', err);
            res.status(500).json({ message: 'Error fetching desserts' });
        }
    }
};

module.exports = dessertController;
