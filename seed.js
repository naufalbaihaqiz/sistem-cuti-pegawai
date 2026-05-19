const bcrypt = require('bcryptjs');
const db = require('./config/db');

async function seed() {
    try {
        console.log('--- Memulai Seeding Data ---');

        // 1. Password yang akan digunakan untuk semua akun testing
        const rawPassword = 'password123';
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        // 2. Definisi Data User (Admin, Pegawai, Atasan, Atasan Atasan)
        const users = [
            { id: 1, name: 'Administrator Cuti', email: 'admin@cuti.com', roleId: 1 },
            { id: 2, name: 'Pegawai', email: 'pegawai@cuti.com', roleId: 2 },
            { id: 3, name: 'Atasan', email: 'atasan@cuti.com', roleId: 3 },
            { id: 4, name: 'Atasan Level2', email: 'atasan_atasan@cuti.com', roleId: 4 }
        ];

        for (const user of users) {
            // Update atau Insert User
            // Menggunakan ON DUPLICATE KEY UPDATE agar jika ID sudah ada, dia hanya mengupdate passwordnya
            await db.query(`
                INSERT INTO users (id, name, email, password) 
                VALUES (?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE password = ?`, 
                [user.id, user.name, user.email, hashedPassword, hashedPassword]
            );

            // Menghubungkan User ke Role di tabel model_has_roles
            await db.query(`
                INSERT INTO model_has_roles (role_id, model_id, model_type) 
                VALUES (?, ?, 'User') 
                ON DUPLICATE KEY UPDATE role_id = role_id`, 
                [user.roleId, user.id]
            );

            console.log(`✅ Berhasil memproses user: ${user.email}`);
        }

        console.log('--- Seeding Selesai! Semua user siap digunakan ---');
        process.exit();
    } catch (error) {
        console.error('❌ Terjadi kesalahan saat seeding:', error.message);
        process.exit(1);
    }
}

seed();