const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDB, sql } = require('../database/dbConnection');

// Mock Secret Key for JWT Token (should be moved to .env in a real project)
const SECRET_KEY = 'your_secret_key';

// Controller for User Operations
const userController = {
    // Login Functionality
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
                res.json({ message: 'Login successful', token });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Create Account Functionality
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

    // Get Account Information Functionality
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
                    dob: user.DOB || '', // Assuming DOB field exists
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

    // Update Account Information Functionality
    // Update Account Information Functionality
    updateAccountInfo: async (req, res) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        try {
            // Verify token to get the user's username
            const decoded = jwt.verify(token, SECRET_KEY);
            const { email, phone, address } = req.body;

            // Ensure all fields are provided
            if (!email || !phone || !address) {
                console.log('Missing fields:', { email, phone, address });
                return res.status(400).json({ message: 'All fields (email, phone, address) are required.' });
            }

            // Ensure phone number length is valid (should be 10 characters)
            if (phone.length > 10) {
                return res.status(400).json({ message: 'Phone number must be 10 characters or less.' });
            }

            // Connect to the database
            const pool = await connectToDB();

            // Check if the user exists
            const userExists = await pool.request()
                .input('Username', sql.Char(100), decoded.username)
                .query('SELECT * FROM Customer WHERE Username = @Username');

            if (userExists.recordset.length > 0) {
                // Update user information in the database
                const updateResult = await pool.request()
                    .input('Username', sql.Char(100), decoded.username)
                    .input('Email', sql.Char(150), email)
                    .input('Phone', sql.Char(10), phone) // Updated to allow up to 10 characters
                    .input('Address', sql.Char(100), address) // Kept as CHAR(100)
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


    // Delete Account Functionality
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
