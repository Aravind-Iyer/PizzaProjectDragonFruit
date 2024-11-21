const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDB } = require('../database/dbConnection');

const SECRET_KEY = 'your_secret_key';

const userController = {
    // Login
    login: (req, res) => {
        const { email, password } = req.body;
        try {
            const db = connectToDB();
            const query = 'SELECT * FROM Customer WHERE Email = ?';
            const user = db.prepare(query).get(email);

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            bcrypt.compare(password, user.Password.trim(), (err, passwordMatch) => {
                if (err || !passwordMatch) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const isManager = email.toLowerCase().endsWith('@mp.com');
                const token = jwt.sign({ username: user.Username, isManager }, SECRET_KEY, { expiresIn: '2h' });

                res.json({
                    message: 'Login successful',
                    token,
                    customerId: user.CustomerID,
                    isManager,
                });
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Create Account
    createAccount: (req, res) => {
        const { username, password, email, firstName, lastName, cardNumber, cardExpiry, cardCVV } = req.body;
        try {
            if (username.endsWith('.MP')) {
                return res.status(400).json({ message: 'You cannot create an account with a .MP suffix.' });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.match(emailRegex)) {
                return res.status(400).json({ message: 'Invalid email format.' });
            }

            // Validate password complexity
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+])[A-Za-z\d@$!%*?&#^()_\-+]{10,}$/;

            if (!password.match(passwordRegex)) {
                return res.status(400).json({ message: 'Password must be at least 10 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.' });
            }

            const db = connectToDB();
            const userExists = db.prepare('SELECT * FROM Customer WHERE Username = ?').get(username);

            if (userExists) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ message: 'Error hashing password' });
                }

                db.prepare(`
                    INSERT INTO Customer (CustomerID, Username, FirstName, LastName, Email, Password, CardNumber, CardExpiry, CardCVV)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).run(
                    Math.floor(Math.random() * 10000), // kek too bad if collision happens LOLL oh well rng
                    username,
                    firstName,
                    lastName,
                    email,
                    hashedPassword,
                    cardNumber,
                    cardExpiry,
                    cardCVV
                );

                res.status(201).json({ message: 'Account created successfully' });
            });
        } catch (err) {
            console.error('Create account error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Get Account Info
    getAccountInfo: (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const db = connectToDB();
            const user = db.prepare('SELECT * FROM Customer WHERE Username = ?').get(decoded.username);

            if (user) {
                res.json({
                    username: user.Username,
                    email: user.Email,
                    firstName: user.FirstName,
                    lastName: user.LastName,
                    phone: user.Phone || '',
                    dob: user.DOB || '',
                    address: user.Address || '',
                    cardNumber: user.CardNumber || '',
                    cardExpiry: user.CardExpiry || '',
                    cardCVV: user.CardCVV || '',
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
    updateAccountInfo: (req, res) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authorization token required' });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const { email, phone, address, cardNumber, cardExpiry, cardCVV } = req.body;

            if (!email || !phone || !address) {
                return res.status(400).json({ message: 'All fields (email, phone, address) are required.' });
            }

            if (phone.length > 10) {
                return res.status(400).json({ message: 'Phone number must be 10 characters or less.' });
            }

            const db = connectToDB();
            const userExists = db.prepare('SELECT * FROM Customer WHERE Username = ?').get(decoded.username);

            if (userExists) {
                const changes = db.prepare(`
                    UPDATE Customer
                    SET Email = ?, Phone = ?, Address = ?, CardNumber = ?, CardExpiry = ?, CardCVV = ?
                    WHERE Username = ?
                `).run(email, phone, address,cardNumber, cardExpiry, cardCVV, decoded.username);

                if (changes.changes === 0) {
                    return res.status(400).json({ message: 'Update failed, no rows affected.' });
                }

                res.json({ message: 'Account information updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error('Update account info error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Delete Account
    deleteAccount: (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const db = connectToDB();
            const user = db.prepare('SELECT * FROM Customer WHERE Username = ?').get(decoded.username);

            if (user) {
                // Step 1: Delete from related tables
                db.prepare('DELETE FROM OrderSummary WHERE CustomerID = ?').run(user.CustomerID);
                db.prepare('DELETE FROM CustomPizza WHERE CustomerID = ?').run(user.CustomerID);
                db.prepare('DELETE FROM Payments WHERE CustomerID = ?').run(user.CustomerID);
                db.prepare('DELETE FROM CustomerOrdersTable WHERE CustomerID = ?').run(user.CustomerID);
                db.prepare('DELETE FROM Cart WHERE CustomerID = ?').run(user.CustomerID);

                // Step 2: Delete customer record
                db.prepare('DELETE FROM Customer WHERE Username = ?').run(decoded.username);

                res.json({ message: 'Account deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error('Delete account error:', err);
            res.status(500).json({ message: 'Server error' });
        }
    }

};

module.exports = userController;
