const User = require('../models/User');

// Display user list
exports.listUsers = (req, res) => {
    User.getAllUsers((users) => {
        res.render('users', { users });
    });
};

// Show add user form
exports.showAddUserForm = (req, res) => {
    res.render('addUser');
};

// Handle adding a user
exports.addUser = (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,  // Remember to hash in a real app
        fullname: req.body.fullname,
        address: req.body.address,
        sex: req.body.sex,
        email: req.body.email
    };
    User.addUser(newUser, () => {
        res.redirect('/users');
    });
};

// Show edit user form
exports.showEditUserForm = (req, res) => {
    User.getUserByUsername(req.params.username, (user) => {
        res.render('editUser', { user });
    });
};

// Handle editing a user
exports.editUser = (req, res) => {
    const updatedUser = {
        fullname: req.body.fullname,
        address: req.body.address,
        sex: req.body.sex,
        email: req.body.email
    };
    User.updateUser(req.params.username, updatedUser, () => {
        res.redirect('/users');
    });
};

// Handle deleting a user
exports.deleteUser = (req, res) => {
    User.deleteUser(req.params.username, () => {
        res.redirect('/users');
    });
};
