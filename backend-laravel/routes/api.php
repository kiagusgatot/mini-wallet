<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PinController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/pin/login', [PinController::class, 'loginWithPin']);
Route::get('/pin/status', [PinController::class, 'status']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',       [AuthController::class, 'logout']);
    Route::get('/wallet',        [WalletController::class, 'balance']);
    Route::post('/topup',        [WalletController::class, 'topup']);
    Route::post('/transfer',     [WalletController::class, 'transfer']);
    Route::get('/transactions',  [WalletController::class, 'transactions']);
    
    Route::get('/user', function (Request $request) {
        return response()->json(['user' => $request->user()]);
    });

    // PIN
    Route::post('/pin/create', [PinController::class, 'createPin']);
});
