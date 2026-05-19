const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.renderLogin = (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.render('login', { error: 'Email salah.' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', { error: 'Password salah.' });
        }

        const [roles] = await db.query(
            `SELECT r.name FROM roles r 
             JOIN model_has_roles mhr ON r.id = mhr.role_id 
             WHERE mhr.model_id = ? AND mhr.model_type = 'User'`,
            [user.id]
        );

        req.session.userId = user.id;
        req.session.name = user.name;
        req.session.roles = roles.map(r => r.name);

        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Terjadi kesalahan server.' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('cuti_cookie_session');
        res.redirect('/auth/login');
    });
};

exports.fixPassword = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await db.query(
            "UPDATE users SET password = ? WHERE email = 'admin@cuti.com'",
            [hashedPassword]
        );

        res.send("Berhasil! Silakan kembali ke halaman login dan pakai sandi: password123");
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
};