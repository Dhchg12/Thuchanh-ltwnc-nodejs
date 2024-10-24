const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import model người dùng

// Controller để xử lý đăng nhập
class AuthController {
    static login(req, res) {
        const { username, password } = req.body;

        // Lấy thông tin người dùng từ model
        User.getUserByUsername(username, (err, result) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).send('Internal server error');
            }

            // Nếu không tìm thấy người dùng
            if (result.length === 0) {
                return res.render('login', { error: 'Invalid username or password' });
            }

            const user = result[0];

            // So sánh mật khẩu
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send('Internal server error');
                }

                if (isMatch) {
                    // Lưu thông tin người dùng vào session
                    req.session.userId = user.id;
                    req.session.username = user.username; // Lưu tên người dùng

                    res.redirect('/users'); // Chuyển hướng đến trang người dùng
                } else {
                    // Mật khẩu không hợp lệ
                    res.render('login', { error: 'Invalid username or password' });
                }
            });
        });
    }
}

module.exports = AuthController;
