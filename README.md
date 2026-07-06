---

# 💳 Yatra Pay

Aplikasi dompet digital fullstack yang
dibangun dengan Laravel 13 + React.
Dibuat sebagai exam project Bootcamp
Fullstack Web Development Dibimbing.id 2026.

---

## 🚀 Live Demo

| Platform | URL |
|----------|-----|
| Frontend | https://mini-wallet-drab.vercel.app |
| Backend API | https://mini-wallet-production-b055.up.railway.app |
| GitHub | https://github.com/kiagusgatot/mini-wallet |

---

## ✨ Fitur

- 🔐 Autentikasi email + PIN 6 digit (ATM style)
- 💰 Top Up saldo wallet
- 📤 Transfer ke sesama pengguna
- 📋 Riwayat transaksi lengkap dengan filter
- 📊 Grafik aktivitas 7 hari (Bar Chart)
- 👤 Profil pengguna
- 📱 Mobile-first design (390px)
- 🎨 Animasi transisi halaman (Framer Motion)
- ⏳ Loading spinner elegan
- 🛡️ Error prevention & validasi real-time

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Fungsi |
|-----------|--------|
| Laravel 13 | PHP Framework |
| Laravel Sanctum | Token Authentication |
| MySQL | Database |
| Railway | Deployment & Hosting |

### Frontend
| Teknologi | Fungsi |
|-----------|--------|
| React 18 | UI Library |
| Vite | Build Tool |
| React Router 6 | Client-side Routing |
| Framer Motion | Animasi & Transisi |
| Recharts | Bar Chart Aktivitas |
| Lucide React | Icon Library |
| Axios | HTTP Client |
| Vercel | Deployment & Hosting |

---

## 📁 Struktur Project

```text
mini-wallet/
├── backend-laravel/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── WalletController.php
│   │   │   │   └── PinController.php
│   │   │   └── Requests/
│   │   └── Models/
│   │       ├── User.php
│   │       ├── Wallet.php
│   │       └── Transaction.php
│   ├── database/migrations/
│   ├── routes/api.php
│   └── config/cors.php
│
└── frontend-react/
    ├── src/
    │   ├── components/
    │   │   ├── AnimatedCounter.jsx
    │   │   ├── BackButton.jsx
    │   │   ├── Badge.jsx
    │   │   ├── BottomNav.jsx
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── Numpad.jsx
    │   │   ├── PageLayout.jsx
    │   │   └── PageTransition.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── CreatePinPage.jsx
    │   │   ├── PinLoginPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── TopUpPage.jsx
    │   │   ├── TransferPage.jsx
    │   │   ├── HistoryPage.jsx
    │   │   └── ProfilePage.jsx
    │   ├── services/api.js
    │   ├── styles/tokens.css
    │   ├── hooks/useAuth.js
    │   ├── App.jsx
    │   └── index.css
    └── vercel.json
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| POST | /api/register | ❌ | Daftar akun baru |
| POST | /api/login | ❌ | Login email + password |
| POST | /api/logout | ✅ | Logout & hapus token |
| GET | /api/user | ✅ | Data user yang login |

### Wallet
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | /api/wallet/balance | ✅ | Cek saldo wallet |
| POST | /api/wallet/topup | ✅ | Top up saldo |
| POST | /api/wallet/transfer | ✅ | Transfer ke pengguna lain |
| GET | /api/wallet/transactions | ✅ | Riwayat transaksi |

### PIN
| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | /api/pin/status | ❌ | Cek status PIN user |
| POST | /api/pin/create | ✅ | Buat PIN 6 digit |
| POST | /api/pin/login | ❌ | Login dengan PIN |

---

## 🔐 Flow Autentikasi

Register (email + password)
        ↓
Buat PIN 6 digit (/create-pin)
        ↓
Login berikutnya:
  Masukkan email (/login)
        ↓
  Masukkan PIN (/pin-login)
        ↓
  Dashboard (/dashboard)

---

## 🗄️ Database Schema

### Tabel users
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | bigint | Primary key |
| name | string | Nama lengkap |
| username | string | Username unik |
| email | string | Email unik |
| password | string | Bcrypt hash |
| phone | string | Nomor HP (opsional) |
| pin | string | PIN 6 digit (bcrypt) |
| pin_created_at | timestamp | Waktu buat PIN |

### Tabel wallets
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | bigint | Primary key |
| user_id | bigint | FK ke users |
| balance | decimal | Saldo (default 0) |

### Tabel transactions
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | bigint | Primary key |
| wallet_id | bigint | FK ke wallets |
| related_wallet_id | bigint | Wallet penerima |
| type | enum | topup / transfer |
| amount | decimal | Nominal transaksi |
| note | string | Catatan (opsional) |
| created_at | timestamp | Waktu transaksi |

---

## 🎨 Design System

### Color Tokens
| Token | Nilai | Fungsi |
|-------|-------|--------|
| --color-bg | #FFFFFF | Background utama |
| --color-surface | #F8FAFC | Background konten |
| --color-primary | #10b981 | Aksen hijau |
| --color-primary-dark | #059669 | Hijau gelap |
| --color-primary-light | #D1FAE5 | Hijau muda |
| --color-danger | #EF4444 | Error/merah |
| --color-text-primary | #0F172A | Teks utama |
| --color-text-secondary | #64748B | Teks sekunder |
| --color-border | #E2E8F0 | Border/divider |

### Font
Plus Jakarta Sans (Google Fonts)
Weights: 400, 500, 600, 700

---

## ⚙️ Cara Menjalankan Lokal

### Backend
\`\`\`bash
cd backend-laravel
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
\`\`\`

### Frontend
\`\`\`bash
cd frontend-react
npm install
echo "VITE_API_URL=http://localhost:8000/api" > .env
npm run dev
\`\`\`

---

## 🚀 Deployment

### Backend (Railway)
Environment variables yang diperlukan:
APP_KEY=
APP_ENV=production
APP_DEBUG=false
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_DATABASE=${{MySQL.MYSQLDATABASE}}
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
SESSION_DRIVER=file
LOG_CHANNEL=stderr

Jalankan migrasi di Railway Console:
\`\`\`bash
php artisan migrate --force
\`\`\`

### Frontend (Vercel)
- Root Directory: frontend-react
- Environment variable:
  VITE_API_URL=https://yatrapay-production.up.railway.app/api

---

## 📝 Akun Testing

| Email | PIN | Keterangan |
|-------|-----|------------|
| agus@demo.com | 123456 | User utama |
| test@demo.com | 111111 | User testing |
| admin@demo.com | 000000 | Admin demo |

---

## 🐛 Troubleshooting

### CORS Error
Tambahkan URL frontend ke config/cors.php:
\`\`\`php
'allowed_origins' => [
    'http://localhost:5173',
    'https://mini-wallet-drab.vercel.app',
],
\`\`\`

### DB_HOST kosong di Railway
Gunakan nama variable yang benar:
DB_HOST=${{MySQL.MYSQLHOST}}  ✅
DB_HOST=${{MySQL.MYSQL_HOST}} ❌

### 404 saat refresh di Vercel
Pastikan vercel.json ada di frontend-react/:
\`\`\`json
{
  "rewrites": [
    { "source": "/(.*)", 
      "destination": "/index.html" }
  ]
}
\`\`\`

---

## 👤 Developer

Ki Agus Gatot Mahendra Setiawan
Dibimbing.id — Bootcamp Fullstack Web Development 2026

---
