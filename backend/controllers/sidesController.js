const { connectToDB, sql } = require('../database/dbConnection');


const sidesController = {

    getAllSides: async (req, res) => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query(`
            SELECT
                SidesID,
                RTRIM(SidesName) AS SidesName, 
                Cost,
                RTRIM(ImageURL) AS ImageURL 
            FROM Sides
        `);
            console.log('Fetched Sides:', result.recordset);
            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching sides:', err);
            res.status(500).json({ message: 'Error fetching sides' });
        }
    }
};

module.exports = sidesController;
