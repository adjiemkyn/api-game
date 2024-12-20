const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // Host MySQL
    user: 'root',      // Username MySQL
    password: '',      // Password MySQL
    database: 'db_game' // Nama database
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        process.exit(1); // Keluar jika koneksi gagal
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
