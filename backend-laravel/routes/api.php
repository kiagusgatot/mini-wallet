<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',       [AuthController::class, 'logout']);
    Route::get('/wallet',        [WalletController::class, 'balance']);
    Route::post('/topup',        [WalletController::class, 'topup']);
    Route::post('/transfer',     [WalletController::class, 'transfer']);
    Route::get('/transactions',  [WalletController::class, 'transactions']);
});
