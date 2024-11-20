const { connectToDB } = require('../database/dbConnection');

const sidesController = {
    getAllSides: (req, res) => {
        try {
            const db = connectToDB();
            const query = `
                SELECT
                    SidesID,
                    SidesName AS SidesName,
                    Cost,
                    ImageURL AS ImageURL
                FROM Sides
            `;

            const sides = db.prepare(query).all();


            sides.forEach(side => {
                side.SidesName = side.SidesName.trim();
                side.ImageURL = side.ImageURL.trim();
            });

            console.log('Fetched Sides:', sides);

            res.status(200).json(sides);
        } catch (err) {
            console.error('Error fetching sides:', err);
            res.status(500).json({ message: 'Error fetching sides' });
        }
    }
};

module.exports = sidesController;
