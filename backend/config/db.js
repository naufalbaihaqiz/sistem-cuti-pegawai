const mysql = require('mysql2/promise');
require('dotenv').config();

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

dbPool.getConnection()
    .then((connection) => {
        console.log('✅ Sinkronisasi Database Berhasil! Terhubung ke MySQL.');
        connection.release(); // Lepaskan koneksi setelah dites
    })
    .catch((err) => {
        console.error('❌ Gagal terhubung ke Database:', err.message);
    });

module.exports = dbPool;