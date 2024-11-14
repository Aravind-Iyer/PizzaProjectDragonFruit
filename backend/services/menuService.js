// Import your database connection or use sql
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

// Function to get all menu options
exports.getMenuOptions = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT * FROM Options;
            SELECT * FROM Beverages;
            SELECT * FROM Sides;
        `);

        // Assuming the recordsets are returned in the correct order, map to the appropriate option categories
        return {
            options: result.recordsets[0], // Extras, Less, None options for pizza
            beverages: result.recordsets[1],
            sides: result.recordsets[2]
        };
    } catch (error) {
        console.error('Error fetching menu options:', error);
        throw error;
    }
};

// Function to add an order to the cart
exports.addOrder = async (order) => {
    try {
        const pool = await sql.connect(dbConfig);
        const request = pool.request();

        // First, insert the custom pizza details into the CustomPizzas table
        const insertCustomPizzaQuery = `
            INSERT INTO CustomPizzas (OptionsID, Crust, Sauce, ToppingOne, ToppingTwo, ToppingThree, ToppingFour, ToppingFive, Cost, Qty)
            OUTPUT Inserted.CustomPizzasID
            VALUES (@optionsID, @crust, @sauce, @toppingOne, @toppingTwo, @toppingThree, @toppingFour, @toppingFive, @cost, @qty)
        `;

        // Add parameters to prevent SQL injection
        request.input('optionsID', sql.Int, order.options.length > 0 ? order.options[0] : null);
        request.input('crust', sql.Char(20), order.crust);
        request.input('sauce', sql.Char(15), order.sauce);
        request.input('toppingOne', sql.Char(20), order.vegetarianToppings[0] || 'None');
        request.input('toppingTwo', sql.Char(20), order.vegetarianToppings[1] || 'None');
        request.input('toppingThree', sql.Char(20), order.meatToppings[0] || 'None');
        request.input('toppingFour', sql.Char(20), order.meatToppings[1] || 'None');
        request.input('toppingFive', sql.Char(20), order.meatToppings[2] || 'None');
        request.input('cost', sql.Int, order.totalCost);
        request.input('qty', sql.Int, 1);

        // Execute the query and retrieve the CustomPizzasID
        const customPizzaResult = await request.query(insertCustomPizzaQuery);
        const customPizzaID = customPizzaResult.recordset[0].CustomPizzasID;

        // Next, insert the order details into the Orders table
        const insertOrderQuery = `
            INSERT INTO Orders (CustomerID, OrderID, ODCustomPizzasID, TotalCost)
            VALUES (@customerID, @orderID, @customPizzaID, @totalCost)
        `;

        // Add parameters for the Orders table
        request.input('customerID', sql.Int, order.customerID);
        request.input('orderID', sql.Int, Math.floor(Math.random() * 10000)); // Generate unique order ID
        request.input('customPizzaID', sql.Int, customPizzaID);
        request.input('totalCost', sql.Int, order.totalCost);

        // Execute the query to insert into the Orders table
        await request.query(insertOrderQuery);

        console.log('Order added to the database successfully!');
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};
