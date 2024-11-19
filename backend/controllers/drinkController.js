const { connectToDB } = require('../database/dbConnection');

const drinkController = {
    getAllDrinks: (req, res) => {
        try {
            const db = connectToDB(); // Get the SQLite database instance
            const query = `
                SELECT
                    DrinkID,
                    DrinkName AS DrinkName,
                    Size AS Size,
                    Cost,
                    ImageURL AS ImageURL
                FROM Drinks
            `;

            const drinks = db.prepare(query).all(); // Execute the query and get all rows

            // Optionally trim fields if necessary (SQLite doesn't have RTRIM by default)
            drinks.forEach(drink => {
                drink.DrinkName = drink.DrinkName.trim();
                drink.Size = drink.Size.trim();
                drink.ImageURL = drink.ImageURL.trim();
            });

            console.log('Database Results:', drinks);

            res.status(200).json(drinks);
        } catch (err) {
            console.error('Error fetching drinks:', err);
            res.status(500).json({ message: 'Error fetching drinks' });
        }
    }
};

module.exports = drinkController;
