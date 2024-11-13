const express = require('express');
const sql = require('mssql');
const dbConfig = require('./config/dbConfig');
const menuRoutes = require('./routes/menuRoutes');

require('dotenv').config();  // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the SQL Server
sql.connect(dbConfig)
    .then(() => {
        console.log('Connected to the database successfully!');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

// Middleware
app.use(express.json());

// Example Route
app.get('/', (req, res) => {
    res.send('Welcome to Mom & Pop’s Pizzeria API');
});

// Use Menu Routes
app.use('/api/menu', menuRoutes);

// Start the Express Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
