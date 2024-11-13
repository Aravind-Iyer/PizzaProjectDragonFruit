const menuService = require('../services/menuService');

// Controller function to get all menu options
const getMenuOptions = async (req, res) => {
    try {
        const options = await menuService.getMenuOptions();
        res.status(200).json(options);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve menu options', error });
    }
};

module.exports = {
    getMenuOptions,
};
