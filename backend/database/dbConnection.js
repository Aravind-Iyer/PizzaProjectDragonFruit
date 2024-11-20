const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let db;

function connectToDB() {
    try {
        if (!db) {

            const baseDir = process.pkg ? path.dirname(process.execPath) : __dirname;
            const dataDir = path.join(baseDir, 'data');


            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            const dbPath = path.join(dataDir, 'demo.db');
            console.log(`Connecting to SQLite Database at ${dbPath}`);
            db = new Database(dbPath); // Creates or opens the database file
            console.log('Connected to SQLite Database successfully');


            db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT
                );
            `);
        }
        return db;
    } catch (err) {
        console.error('SQLite Database connection failed:', err);
        throw err;
    }
}

module.exports = {
    connectToDB
};