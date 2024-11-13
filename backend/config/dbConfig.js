require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,             // SQL Server username
    password: process.env.DB_PASSWORD,     // SQL Server password
    server: process.env.DB_HOST,           // SQL Server hostname or IP (e.g., localhost)
    port: parseInt(process.env.DB_PORT, 1433), // SQL Server port (usually 1433)
    database: process.env.DB_NAME,         // Name of the database you are connecting to
    options: {
        encrypt: false,                      // Set to false if not using Azure
        trustServerCertificate: true         // Use this if you're working locally without SSL certificates
    }
};

module.exports = dbConfig;
