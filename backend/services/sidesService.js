const { connectToDB, sql } = require('../database/dbConnection');

const sidesService = {
    getSides: async () => {
        try {
            const pool = await connectToDB();
            const result = await pool.request().query('SELECT * FROM Sides');
            return result.recordset;
        } catch (err) {
            console.error('Error in sidesService:', err);
            throw err;
        }
    }
};

module.exports = sidesService;
