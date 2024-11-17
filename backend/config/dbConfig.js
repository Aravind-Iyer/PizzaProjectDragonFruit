// backend/config/dbConfig.js - Database Configuration
require('dotenv').config(); // Load .env file

const dbConfig = {
    user: process.env.DB_USER, // Use environment variable
    password: process.env.DB_PASSWORD, // Use environment variable
    server: process.env.DB_SERVER, // Use environment variable
    database: process.env.DB_DATABASE, // Use environment variable
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // Convert string to boolean
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' // Convert string to boolean
    }
};

module.exports = dbConfig;