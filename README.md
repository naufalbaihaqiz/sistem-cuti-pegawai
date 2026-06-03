🚀 Sistem Informasi Cuti Pegawai FTI - Universitas Andalas
Sistem berbasis Web untuk administrasi dan pengelolaan data pengajuan cuti pegawai di Fakultas Teknologi Informasi. Sistem ini terintegrasi penuh dengan arsitektur keamanan tingkat lanjut meliputi otorisasi Role-Based Access Control (RBAC) berjenjang dan Access Control List (ACL). Proyek ini dibangun menggunakan Node.js dengan pendekatan Native SQL Query (Tanpa ORM) yang dioptimalkan menggunakan kueri JOIN demi performa maksimal.

📌 Fitur Utama
Autentikasi Terenkripsi & Aman: Login menggunakan pengamanan password satu arah berbasis bcryptjs. Dilengkapi dengan proteksi dari serangan User Enumeration (penyamarataan pesan error).

Multi-Level RBAC & ACL: Pembatasan akses halaman dan rute secara ketat berdasarkan hierarki peran (Admin, Pegawai, Atasan, Atasan Level 2) menggunakan sistem tabel jembatan (pivot table / Polymorphic).

Manajemen Session Terpusat: Pengelolaan status identitas dan hak akses login pengguna secara aman di memori server.

UI Modern & Glassmorphism: Antarmuka responsif dan estetik menggunakan kustomisasi CSS modern (berbasis Tailwind v4) lengkap dengan efek visual kekinian (floating labels, backdrop-filter).
