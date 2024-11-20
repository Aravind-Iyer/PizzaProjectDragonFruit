// THE ONLY NON DEPRECATED FILE LOL

const { connectToDB, sql } = require('../database/dbConnection');

const forgotPasswordService = {
    checkEmailExists: async (email) => {
        try {
            const pool = await connectToDB();

            const result = await pool.request()
                .input('Email', sql.Char(150), email)
                .query('SELECT * FROM Customer WHERE Email = @Email');

            return result.recordset.length > 0;
        } catch (error) {
            console.error('Error checking email existence:', error);
            throw new Error('Database query failed');
        }
    },
};

module.exports = forgotPasswordService;
