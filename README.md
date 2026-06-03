# 🚀 Sistem Informasi Cuti Pegawai FTI - Universitas Andalas

Sistem berbasis Web untuk administrasi dan pengelolaan data pengajuan cuti pegawai di Fakultas Teknologi Informasi. Sistem ini terintegrasi penuh dengan arsitektur keamanan tingkat lanjut meliputi otorisasi **Role-Based Access Control (RBAC)** berjenjang dan **Access Control List (ACL)**. Proyek ini dibangun menggunakan **Node.js** dengan pendekatan **Native SQL Query** (Tanpa ORM) yang dioptimalkan menggunakan kueri `JOIN` demi performa maksimal.

## 📌 Fitur Utama

- **Autentikasi Terenkripsi:** Login menggunakan pengamanan password satu arah berbasis `bcryptjs` dengan proteksi anti-*hacker* (penyamarataan pesan error).
- **Multi-Level RBAC & ACL:** Pembatasan akses halaman dan rute secara ketat berdasarkan hierarki peran (Admin, Pegawai, Atasan, Atasan Level 2) menggunakan sistem tabel jembatan (*pivot table* / *Polymorphic*).
- **Manajemen Session:** Pengelolaan status identitas dan hak akses login pengguna secara aman di memori server.
- **UI Modern & Glassmorphism:** Antarmuka responsif dan estetik menggunakan kustomisasi CSS modern berbasis **Tailwind CSS v4** lengkap dengan efek visual kekinian (*floating labels*, *backdrop-filter*).

## 🛠️ Stack Teknologi

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **View Engine:** EJS (Embedded JavaScript)
- **Security:** Bcryptjs (Hashing Kriptografi), Express-Session
- **Styling:** Custom CSS (Tailwind CSS v4 Base)

## 📂 Struktur Proyek

```text
SISTEM-CUTI-FTI/
├── config/             # Konfigurasi jembatan koneksi ke database MySQL
├── controllers/        # Logika pemrosesan utama (Auth, Cuti, dll)
├── middlewares/        # Satpam lapisan keamanan (requireLogin & requireRole)
├── models/             # Struktur data dan query SQL Native (Data Layer)
├── public/             # Asset web statis (CSS, JS, Logo, Background)
├── routes/             # Papan petunjuk arah endpoint URL
├── views/              # Template tampilan layar antarmuka pengguna (EJS)
└── server.js           # Entry point aplikasi