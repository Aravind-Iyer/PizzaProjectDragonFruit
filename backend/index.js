// backend/index.js - Server Entry Point

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt'); // For hashing the default user's password
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const { connectToDB } = require('./database/dbConnection'); // SQLite connection setup

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());


const baseDir = process.pkg ? path.dirname(process.execPath) : __dirname;
const staticDir = process.pkg
  ? path.join(baseDir, 'frontend') // When packaged, 'frontend' is alongside the executable
  : path.join(baseDir, '../frontend'); // During dev useee

// Log the static directory path for debugging
console.log(`Serving static files from: ${staticDir}`);

// Serve static files from the staticDir directory
app.use(express.static(staticDir));

// Import and register route modules
try {
    const drinkRoutes = require('./routes/drinkRoutes');
    const userRoutes = require('./routes/userRoutes');
    const dessertRoutes = require('./routes/dessertRoutes');
    const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');
    const cartRoutes = require('./routes/cartRoutes');
    const paymentRoutes = require('./routes/paymentRoutes');
    const sidesRoutes = require('./routes/sidesRoutes');
    const customPizzaRoutes = require('./routes/customPizzaRoutes');
    const orderRoutes = require('./routes/orderSummaryRoutes');

    app.use('/api', drinkRoutes);
    app.use('/api', userRoutes);
    app.use('/api', dessertRoutes);
    app.use('/api', forgotPasswordRoutes);
    app.use('/api', cartRoutes);
    app.use('/api', paymentRoutes);
    app.use('/api', sidesRoutes);
    app.use('/api', customPizzaRoutes);
    app.use('/api', orderRoutes);
} catch (err) {
    console.error('Error importing routes:', err);
}

// Initialize the database and ensure tables are set up
const initializeDatabase = async () => {
    try {
        const db = connectToDB();
        console.log('Initializing database...');


        db.exec(`
            CREATE TABLE IF NOT EXISTS Customer (
            CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
            Username TEXT NOT NULL UNIQUE,
            FirstName TEXT,
            LastName TEXT,
            Email TEXT NOT NULL UNIQUE,
            Address TEXT,
            Password TEXT NOT NULL,
            Phone TEXT,
            CardNumber TEXT,    
            CardExpiry TEXT,    
            CardCVV TEXT             
                                                
            );

            CREATE TABLE IF NOT EXISTS Cart (
            CartID INTEGER PRIMARY KEY AUTOINCREMENT,
            CustomerID INTEGER NOT NULL,
            ItemID INTEGER NOT NULL,
            ItemType TEXT NOT NULL,
            ItemName TEXT NOT NULL,
            Quantity INTEGER NOT NULL,
            Cost REAL NOT NULL,
            FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
                );

            CREATE TABLE IF NOT EXISTS OrderSummary (
            OrderSummaryID INTEGER PRIMARY KEY AUTOINCREMENT,
            CustomerID INTEGER NOT NULL,
            ItemType TEXT,
            ItemName TEXT,
            Quantity INTEGER,
            Cost REAL,
            OrderDate TEXT DEFAULT CURRENT_TIMESTAMP,
            PaymentMethod TEXT,
            CardNumber TEXT,
            PaymentID INTEGER,
            DeliveryOption TEXT DEFAULT 'Pickup',
            FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
            FOREIGN KEY (PaymentID) REFERENCES Payments(PaymentID)
                );

            CREATE TABLE IF NOT EXISTS Payments (
                
            PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
            CustomerID INTEGER NOT NULL,
            PaymentMethod TEXT NOT NULL,
            CardNumber TEXT,
            GiftCardNumber TEXT,
            AmountPaid REAL NOT NULL,
            OrderDate TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
                );

            CREATE TABLE IF NOT EXISTS Sides (
            SidesID INTEGER PRIMARY KEY AUTOINCREMENT,
            SidesName TEXT NOT NULL,
            Cost REAL NOT NULL,
            ImageURL TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS CustomPizza (
            PizzaID INTEGER PRIMARY KEY AUTOINCREMENT,
            CustomerID INTEGER NOT NULL,
            PizzaName TEXT NOT NULL,
            Crust TEXT,
            Sauce TEXT,
            Cheese TEXT,
            Size TEXT,
            Toppings TEXT,
            Cost REAL,
            FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
            );

            CREATE TABLE IF NOT EXISTS Desserts (
            DessertID INTEGER PRIMARY KEY AUTOINCREMENT,
            DessertName TEXT NOT NULL,
            Cost REAL NOT NULL,
            ImageURL TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Drinks (
            DrinkID INTEGER PRIMARY KEY AUTOINCREMENT,
            DrinkName TEXT NOT NULL,
            Size TEXT NOT NULL,
            Cost REAL NOT NULL,
            ImageURL TEXT
            );

            CREATE TABLE IF NOT EXISTS Employee (
            EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
            Password TEXT NOT NULL,
            HoursWorked INTEGER,
            FirstName TEXT NOT NULL,
            LastName TEXT NOT NULL,
            PayRate REAL NOT NULL,
            Manager TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Manager (
            ManagerID INTEGER PRIMARY KEY AUTOINCREMENT,
            Password TEXT NOT NULL,
            Email TEXT NOT NULL,
            FirstName TEXT NOT NULL,
            LastName TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Options (
            OptionsID INTEGER PRIMARY KEY AUTOINCREMENT,
            Extras BLOB,
            Less BLOB,
            None BLOB,
            Cost REAL NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Pizza (
            PizzaID INTEGER PRIMARY KEY AUTOINCREMENT,
            PizzaName TEXT NOT NULL,
            OptionsID INTEGER NOT NULL,
            Cost REAL NOT NULL,
            Qty INTEGER,
            Ingredients TEXT NOT NULL,
            FOREIGN KEY (OptionsID) REFERENCES Options(OptionsID)
                );

            CREATE TABLE IF NOT EXISTS CustomerOrdersTable (
            OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
            CustomerID INTEGER,
            ItemID INTEGER,
            ItemType TEXT,
            ItemName TEXT,
            Quantity INTEGER,
            Cost REAL,
            FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
            );

        `);

        // Insert default data for Sides, if the table is empty

        db.exec(`
            INSERT OR IGNORE INTO Desserts (DessertID, DessertName, Cost, ImageURL) VALUES
                (1, 'Cinnamon Bites', 4.99, 'assets/images/cinnamon-bites.jpg'),
                (2, 'Brownie', 3.99, 'assets/images/brownie.jpg'),
                (3, 'Choco Lava Cake', 5.99, 'assets/images/choco-lava-cake.jpg'),
                (4, 'Croissant', 2.99, 'assets/images/croissant.jpg'),
                (5, 'Cookies', 1.99, 'assets/images/cookies.jpg');

            INSERT OR IGNORE INTO Drinks (DrinkID, DrinkName, Size, Cost, ImageURL) VALUES
                (2, 'Coca-Cola', 'Small', 1.99, '../assets/images/coca-cola.jpg'),
                (3, 'Pepsi', 'Small', 1.89, '../assets/images/pepsi.jpg'),
                (4, 'Sprite', 'Small', 1.79, '../assets/images/sprite.jpg'),
                (5, 'Fanta Orange', 'Small', 1.99, '../assets/images/fanta.jpg'),
                (6, 'Mountain Dew', 'Small', 1.89, '../assets/images/mountain-dew.jpg'),
                (7, 'Dr Pepper', 'Small', 1.99, '../assets/images/dr-pepper.jpg'),
                (8, '7UP', 'Small', 1.79, '../assets/images/7up.jpg');

            INSERT OR IGNORE INTO Sides (SidesID, SidesName, Cost, ImageURL) VALUES
                (1, 'Homemade Dipping Sauces', 3.00, 'assets/images/dipping-sauces.png'),
                (2, 'Chicken Wings', 7.99, 'assets/images/chicken-wings.png'),
                (3, 'Breadsticks', 4.99, 'assets/images/breadsticks.png'),
                (4, 'Garlic Knots', 5.99, 'assets/images/garlic-knots.png'),
                (5, 'Garlic', 0.50, 'assets/images/garlic.png'),
                (6, 'Hot Buffalo', 0.50, 'assets/images/hot-buffalo.png'),
                (7, 'Ranch', 0.50, 'assets/images/ranch.png'),
                (8, 'Marinara', 0.50, 'assets/images/marinara.png');
        `);

        console.log('Database initialized successfully.');



    } catch (err) {
        console.error('Error initializing the database:', err);
    }
};


initializeDatabase();


app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Start the server
app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Application is accessible at http://localhost:${PORT}/pages/home.html`);
        console.log('Press Ctrl+C to stop the server.');
    }
});

// Debug registered routes
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`Route registered: ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    }
});