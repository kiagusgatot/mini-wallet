# Mini Wallet — Setup Guide

Proyek terdiri dari dua bagian: **backend** (Laravel + Sanctum) dan **frontend** (React + Vite).

---

## Prasyarat

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL / MariaDB

---

## Backend (Laravel)

### 1. Scaffold project Laravel

```bash
composer create-project laravel/laravel backend
cd backend
```

### 2. Install Laravel Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 3. Salin file dari folder `backend/` ke project

| Sumber (folder ini)                        | Tujuan (project Laravel)              |
|--------------------------------------------|---------------------------------------|
| `app/Http/Controllers/AuthController.php`  | `app/Http/Controllers/`               |
| `app/Http/Controllers/WalletController.php`| `app/Http/Controllers/`               |
| `app/Http/Requests/*.php`                  | `app/Http/Requests/`                  |
| `app/Models/User.php`                      | `app/Models/` (timpa yang ada)        |
| `app/Models/Wallet.php`                    | `app/Models/`                         |
| `app/Models/Transaction.php`               | `app/Models/`                         |
| `database/migrations/*.php`                | `database/migrations/`                |
| `routes/api.php`                           | `routes/` (timpa yang ada)            |

> **Catatan:** Hapus file migration bawaan Laravel untuk `users`, `password_reset_tokens`, dll. agar tidak konflik.

### 4. Konfigurasi `.env`

```bash
cp .env.example .env
php artisan key:generate
```

Isi variabel berikut sesuai setup lokal:

```
DB_DATABASE=mini_wallet
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Buat database

```sql
CREATE DATABASE mini_wallet;
```

### 6. Jalankan migrasi

```bash
php artisan migrate
```

### 7. Aktifkan Sanctum (Laravel 11 — `bootstrap/app.php`)

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ]);
})
```

### 8. Jalankan server

```bash
php artisan serve
# API berjalan di http://localhost:8000
```

---

## Frontend (React + Vite)

### 1. Scaffold project Vite

```bash
npm create vite@latest frontend -- --template react
cd frontend
```

### 2. Install dependencies

```bash
npm install axios react-router-dom
```

### 3. Salin file dari folder `frontend/` ke project

Ganti seluruh isi `src/` dengan file yang tersedia di folder ini.
Ganti juga `index.html`, `package.json`, dan `vite.config.js`.

### 4. Konfigurasi `.env`

```bash
cp .env.example .env
```

Isi `VITE_API_URL` jika API tidak berjalan di `localhost:8000`.

### 5. Install ulang dependencies

```bash
npm install
```

### 6. Jalankan

```bash
npm run dev
# App berjalan di http://localhost:3000
```

---

## Endpoint API

| Method | Endpoint           | Auth           | Keterangan               |
|--------|--------------------|----------------|--------------------------|
| POST   | /api/register      | —              | Registrasi akun baru     |
| POST   | /api/login         | —              | Login → dapat token      |
| POST   | /api/logout        | Bearer Token   | Hapus token aktif        |
| GET    | /api/wallet        | Bearer Token   | Lihat saldo              |
| POST   | /api/topup         | Bearer Token   | Tambah saldo             |
| POST   | /api/transfer      | Bearer Token   | Kirim saldo ke user lain |
| GET    | /api/transactions  | Bearer Token   | Riwayat mutasi           |
