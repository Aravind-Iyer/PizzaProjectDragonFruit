const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let db; // SQLite database instance

function connectToDB() {
    try {
        if (!db) {
            // Determine the base directory for the database file
            const baseDir = process.pkg ? path.dirname(process.execPath) : __dirname;
            const dataDir = path.join(baseDir, 'data');

            // Ensure the data directory exists
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            const dbPath = path.join(dataDir, 'demo.db');
            console.log(`Connecting to SQLite Database at ${dbPath}`);
            db = new Database(dbPath); // Creates or opens the database file
            console.log('Connected to SQLite Database successfully');

            // Example: Initialize tables if they don't exist
            db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT
                );
            `);
        }
        return db; // Return the SQLite instance
    } catch (err) {
        console.error('SQLite Database connection failed:', err);
        throw err;
    }
}

module.exports = {
    connectToDB
};