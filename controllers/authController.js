const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.renderLogin = (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Menggunakan kueri JOIN agar lebih efisien (1x jalan untuk ambil user sekaligus role)
        const query = `
            SELECT users.*, roles.name AS role_name
            FROM users
            JOIN model_has_roles ON users.id = model_has_roles.model_id
            JOIN roles ON model_has_roles.role_id = roles.id
            WHERE users.email = ? AND model_has_roles.model_type = 'User'
        `;

        const [rows] = await db.query(query, [email]);

        // Jika user ditemukan di database
        if (rows.length > 0) {
            const user = rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            // Jika password cocok
            if (isMatch) {
                req.session.userId = user.id;
                req.session.name = user.name;
                
                // Dibungkus array [user.role_name] agar fungsi roles.map() di dashboard.ejs kamu TIDAK ERROR
                req.session.roles = [user.role_name]; 

                return res.redirect('/dashboard');
            }
        }

        // Pesan error disamaratakan demi keamanan (hacker tidak tahu yang salah email atau passwordnya)
        return res.render('login', { error: 'Email atau password tidak valid.' });

    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).render('login', { error: 'Terjadi kesalahan pada sistem database.' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.clearCookie('cuti_cookie_session');
        res.redirect('/auth/login');
    });
};