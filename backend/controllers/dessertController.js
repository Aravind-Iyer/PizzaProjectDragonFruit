const { connectToDB } = require('../database/dbConnection');

// Controller for Dessert Operations
const dessertController = {
    // Get all desserts
    getAllDesserts: (req, res) => {
        try {
            const db = connectToDB(); // Get the SQLite database instance
            const query = `
                SELECT
                    DessertID,
                    DessertName AS DessertName, 
                    Cost,
                    ImageURL AS ImageURL
                FROM Desserts
            `;

            const desserts = db.prepare(query).all(); // Synchronously fetch all desserts
            console.log('Fetched Desserts:', desserts);
            res.status(200).json(desserts);
        } catch (err) {
            console.error('Error fetching desserts:', err);
            res.status(500).json({ message: 'Error fetching desserts' });
        }
    }
};

module.exports = dessertController;
