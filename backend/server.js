require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const dbPool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { requireLogin } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionStore = new MySQLStore({}, dbPool);

app.use(session({
    key: 'cuti_cookie_session',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// Gunakan Routes
app.use('/auth', authRoutes);

// Route Dashboard Sementara
app.get('/dashboard', requireLogin, (req, res) => {
    res.render('dashboard', {
        name: req.session.name,
        roles: req.session.roles || []
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/auth/login`)
);