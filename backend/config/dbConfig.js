// backend/config/dbConfig.js - Database Configuration

const dbConfig = {
    user: 'pizzeria_user', // Replace with your actual username for the database
    password: 'aravind02', // Replace with your actual password
    server: 'localhost', // Since it's the default instance, 'localhost' will work fine
    database: 'Dragonfruit', // Ensure this matches your database name
    options: {
        encrypt: false, // Set to true if required by your server's security settings
        trustServerCertificate: true // For local development, allow self-signed certificates
    }
};

module.exports = dbConfig;
