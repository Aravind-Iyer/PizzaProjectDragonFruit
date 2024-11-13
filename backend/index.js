const express = require('express');
const sql = require('mssql');
const path = require('path');
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

// Use Menu Routes
app.use('/api/menu', menuRoutes);

// Serve Static Files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));  // <-- This line serves static files

// Basic route to serve the menu page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/menu.html'));  // <-- This line serves menu.html when visiting root URL
});

// Start the Express Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
