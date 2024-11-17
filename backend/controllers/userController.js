const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDB, sql } = require('../database/dbConnection');

// use this/ implemenmt this if i have the itme
const SECRET_KEY = 'your_secret_key';


const userController = {
    // Login stuff
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const pool = await connectToDB();
            const result = await pool.request()
                .input('Username', sql.Char(100), username)
                .query('SELECT * FROM Customer WHERE Username = @Username');

            const user = result.recordset[0];
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(password, user.Password.trim());
            if (passwordMatch) {
                const token = jwt.sign({ username: user.Username }, SECRET_KEY, { expiresIn: '1h' });
                res.json({
                    message: 'Login successful',
                    token,
                    customerId: user.CustomerID,
                });

            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Create Account
    createAccount: async (req, res) => {
        const { username, password, email, firstName, lastName } = req.body;
        try {
            const pool = await connectToDB();
            const userExists = await pool.request()
                .input('Username', sql.Char(100), username)
                .query('SELECT * FROM Customer WHERE Username = @Username');

            if (userExists.recordset.length > 0) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.request()
                .input('CustomerID', sql.Int, Math.floor(Math.random() * 10000)) // Generating a random ID for demo purposes
                .input('Username', sql.Char(100), username)
                .input('FirstName', sql.Char(100), firstName)
                .input('LastName', sql.Char(100), lastName)
                .input('Email', sql.Char(150), email)
                .input('Password', sql.Char(100), hashedPassword)
                .query('INSERT INTO Customer (CustomerID, Username, FirstName, LastName, Email, Password) VALUES (@CustomerID, @Username, @FirstName, @LastName, @Email, @Password)');

            res.status(201).json({ message: 'Account created successfully' });
        } catch (err) {
            console.error('Create account error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Get Account Info
    getAccountInfo: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const pool = await connectToDB();
            const result = await pool.request()
                .input('Username', sql.Char(100), decoded.username)
                .query('SELECT * FROM Customer WHERE Username = @Username');

            const user = result.recordset[0];
            if (user) {
                res.json({
                    username: user.Username,
                    email: user.Email,
                    firstName: user.FirstName,
                    lastName: user.LastName,
                    phone: user.Phone || '',
                    dob: user.DOB || '',
                    address: user.Address || ''
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error('Get account info error:', err);
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    },

    // Update Account Info
    updateAccountInfo: async (req, res) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        try {
            // Verify token to get the user's username might not work not sure idk w.e dont chagne though
            const decoded = jwt.verify(token, SECRET_KEY);
            const { email, phone, address } = req.body;

            // basicaly making sure all fields are providedd
            if (!email || !phone || !address) {
                console.log('Missing fields:', { email, phone, address });
                return res.status(400).json({ message: 'All fields (email, phone, address) are required.' });
            }

            // valid phone num length
            if (phone.length > 10) {
                return res.status(400).json({ message: 'Phone number must be 10 characters or less.' });
            }

            // Connect to database
            const pool = await connectToDB();

            // Check if user is real!
            const userExists = await pool.request()
                .input('Username', sql.Char(100), decoded.username)
                .query('SELECT * FROM Customer WHERE Username = @Username');

            if (userExists.recordset.length > 0) {

                const updateResult = await pool.request()
                    .input('Username', sql.Char(100), decoded.username)
                    .input('Email', sql.Char(150), email)
                    .input('Phone', sql.Char(10), phone)
                    .input('Address', sql.Char(100), address)
                    .query('UPDATE Customer SET Email = @Email, Phone = @Phone, Address = @Address WHERE Username = @Username');

                if (updateResult.rowsAffected[0] === 0) {
                    console.log('No rows updated for user:', decoded.username);
                    return res.status(400).json({ message: 'Update failed, no rows affected.' });
                }

                res.json({ message: 'Account information updated successfully' });
            } else {
                console.log('User not found:', decoded.username);
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error('Update account info error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },



    deleteAccount: async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const pool = await connectToDB();
            const result = await pool.request()
                .input('Username', sql.Char(100), decoded.username)
                .query('SELECT * FROM Customer WHERE Username = @Username');

            if (result.recordset.length > 0) {
                await pool.request()
                    .input('Username', sql.Char(100), decoded.username)
                    .query('DELETE FROM Customer WHERE Username = @Username');

                res.json({ message: 'Account deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error('Delete account error:', err);
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    },
};

module.exports = userController;
