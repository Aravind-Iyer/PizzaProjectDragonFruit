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
const drinkRoutes = require('./routes/drinkRoutes');
app.use('/api', drinkRoutes);

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
const cartRoutes = require('./routes/cartRoutes');
app.use('/api', cartRoutes);
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api', paymentRoutes);
const sidesRoutes = require('./routes/sidesRoutes'); // Add this line
app.use('/api', sidesRoutes); // Add this line

const customPizzaRoutes = require('./routes/customPizzaRoutes');
app.use('/api', customPizzaRoutes);

const orderRoutes = require('./routes/orderSummaryRoutes');
app.use('/api', orderRoutes);


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
