const { connectToDB } = require('../database/dbConnection');

const dessertController = {

    getAllDesserts: (req, res) => {
        try {
            const db = connectToDB();
            const query = `
                SELECT
                    DessertID,
                    DessertName AS DessertName, 
                    Cost,
                    ImageURL AS ImageURL
                FROM Desserts
            `;

            const desserts = db.prepare(query).all();
            console.log('Fetched Desserts:', desserts);
            res.status(200).json(desserts);
        } catch (err) {
            console.error('Error fetching desserts:', err);
            res.status(500).json({ message: 'Error fetching desserts' });
        }
    }
};

module.exports = dessertController;
