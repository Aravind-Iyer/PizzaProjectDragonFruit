// backend/index.js - Server Entry Point

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Importing user routes
try {
    // Import routes
    const userRoutes = require('./routes/userRoutes');
    const dessertRoutes = require('./routes/dessertRoutes');

    app.use('/api', userRoutes);
    app.use('/api', dessertRoutes);
} catch (err) {
    console.error('Error importing user routes:', err);
}

// Root endpoint just to test if server is running
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Start the server
app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});
