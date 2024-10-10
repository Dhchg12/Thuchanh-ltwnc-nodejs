const db = require('../db');

// Fetch all users from the MySQL database
exports.getAllUsers = (callback) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        callback(results);
    });
};

// Get a specific user by username
exports.getUserByUsername = (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        callback(results[0]);
    });
};

// Add a new user to the database
exports.addUser = (user, callback) => {
    db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) throw err;
        callback(result);
    });
};

// Update an existing user in the database
exports.updateUser = (username, user, callback) => {
    db.query('UPDATE users SET ? WHERE username = ?', [user, username], (err, result) => {
        if (err) throw err;
        callback(result);
    });
};

// Delete a user from the database
exports.deleteUser = (username, callback) => {
    db.query('DELETE FROM users WHERE username = ?', [username], (err, result) => {
        if (err) throw err;
        callback(result);
    });
};
