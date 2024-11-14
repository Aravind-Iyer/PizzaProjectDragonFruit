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

// Serve Static Files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));  // Serve static files from the frontend folder

// Basic Route to Serve Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/home.html'));  // Serve the home page at the root URL
});

// Route to Serve the Menu Page
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/menu.html'));  // Serve the menu page at /menu
});

// Route to Serve Pizza Customization Page
app.get('/pizza.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/pizza.html'));
});

// Use Menu API Routes
app.use('/api/menu', menuRoutes);

// Start the Express Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
