const { connectToDB, sql } = require('../database/dbConnection');

// Controller for Sides Operations
const sidesController = {
    // Get all sides
    getAllSides: async (req, res) => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query(`
            SELECT
                SidesID,
                RTRIM(SidesName) AS SidesName, -- Trim trailing spaces
                Cost,
                RTRIM(ImageURL) AS ImageURL -- Trim trailing spaces
            FROM Sides
        `);
            console.log('Fetched Sides:', result.recordset); // Log fetched data
            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching sides:', err);
            res.status(500).json({ message: 'Error fetching sides' });
        }
    }
};

module.exports = sidesController;
