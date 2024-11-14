// backend/database/dbConnection.js - Establish connection to MSSQL database

const sql = require('mssql');
const dbConfig = require('../config/dbConfig'); // Import the configuration

let pool;

async function connectToDB() {
    try {
        if (!pool) {
            pool = await sql.connect(dbConfig); // Use dbConfig to connect
            console.log('Connected to MSSQL Database successfully');
        }
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

module.exports = {
    connectToDB,
    sql
};
