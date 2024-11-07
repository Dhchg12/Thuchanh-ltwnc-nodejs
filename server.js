import express from 'express'
import 'dotenv/config'
import myDateTime from './date'
import getURL from './getURL'
import viewEngine from './viewEngine'
import initWebRoute from './route/WebRouter';
import db from './db';  // Assuming you have a database connection set up in db.js


const app = express()
const port=process.env.PORT
const bodyParser = require('body-parser');
const userController = require('./controllers/UserController');

initWebRoute(app);
viewEngine(app);

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () =>{
    console.log('Example app listening on post ${port}')
})

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';  // Query to select all users from the users table
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        } else {
            res.render('user', { users: result });  // Pass the result to the user.ejs view
        }
    });
});

app.post('/adduser', (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
        }

        const sql = 'INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)';

        // Insert the user with the hashed password into the database
        db.query(sql, [username, hashedPassword, fullname, address, sex, email], (err, result) => {
            if (err) {
                console.error('Error adding user:', err);
                return res.status(500).send('Error adding user');
            }
            res.redirect('/users');  // Redirect to the user list after successful insertion
        });
    });
});



// Route to display the edit form for a user
app.get('/edituser/:username', (req, res) => {
    const { username } = req.params;
    const sql = 'SELECT * FROM users WHERE username = ?';

    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).send('Error fetching user');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.render('editUser', { user: result[0] });  // Pass user data to the editUser.ejs form
        }
    });
});

// Route to handle the edit form submission
app.post('/edituser/:username', (req, res) => {
    const { username } = req.params;
    const { fullname, address, sex, email } = req.body;
    const sql = 'UPDATE users SET fullname = ?, address = ?, sex = ?, email = ? WHERE username = ?';

    db.query(sql, [fullname, address, sex, email, username], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
        } else {
            res.redirect('/users');  // Redirect to the user list after successful update
        }
    });
});

// Route to display details of a user
app.get('/userdetails/:username', (req, res) => {
    const { username } = req.params;
    const sql = 'SELECT * FROM users WHERE username = ?';

    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).send('Error fetching user');
        } else if (result.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.render('userDetails', { user: result[0] });  // Pass user data to the userDetails.ejs view
        }
    });
});

app.post('/deleteuser/:username', (req, res) => {
    const { username } = req.params;
    const sql = 'DELETE FROM users WHERE username = ?';

    db.query(sql, [username], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
        } else {
            res.redirect('/users');  // Redirect to the user list after successful deletion
        }
    });
});

// Tạo route để hiển thị thời gian
app.get('/date', (req, res) => {
    const currentDateTime = myDateTime();  // Gọi hàm myDateTime từ module date
    res.send(currentDateTime);
});

// Route /geturl
app.get('/geturl', (req, res) => {
    const path = getURL.getPath(req); // Gọi hàm getPath từ module getURL
    const params = getURL.getParamsURL(req); // Gọi hàm getParamsURL từ module getURL
    res.send(`Path: ${path}, Params: ${params}`); // Gửi đường dẫn và tham số về client
});

app.get('/ejs', (req,res) => {
    res.render('test');
})

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/home', (req,res) => {
    res.render('main');
})

app.get('/contact', (req,res) => {
    res.render('contact');
})

app.get('/user', (req,res) => {
    res.render('user');
})

app.get('/adduser', (req, res) => {
    res.render('addUser');  // Render the addUser.ejs formx
});



// User routes
app.get('/users', userController.listUsers);            // Display user list
app.get('/adduser', userController.showAddUserForm);  // Show add user form
app.post('/adduser', userController.addUser);         // Handle add user
app.get('/users/edit/:username', userController.showEditUserForm); // Show edit form
app.post('/users/edit/:username', userController.editUser);        // Handle edit user
app.post('/users/delete/:username', userController.deleteUser);    // Handle delete user




