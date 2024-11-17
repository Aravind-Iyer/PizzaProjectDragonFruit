const { connectToDB, sql } = require('../database/dbConnection');

const drinkController = {
    // Fetch all drinks
    getAllDrinks: async (req, res) => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query(`
                SELECT
                    DrinkID,
                    RTRIM(DrinkName) AS DrinkName,
                    RTRIM(Size) AS Size,
                    Cost,
                    RTRIM(ImageURL) AS ImageURL
                FROM Drinks
            `);
            // Log the data fetched from the database
            console.log('Database Results:', result.recordset);

            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching drinks:', err);
            res.status(500).json({ message: 'Error fetching drinks' });
        }
    }
};

module.exports = drinkController;
