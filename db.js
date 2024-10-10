// const mysql = require('mysql2');

// // Create a connection to the MySQL database
// const connection = mysql.createConnection({
//     host: 'localhost',        // Database host
//     user: 'root',     // Your MySQL username
//     password: '', // Your MySQL password
//     database: 'ltwnc', // Your MySQL database name
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the MySQL database.');
// });

// module.exports = connection;

import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ltwnc'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

export default db;
