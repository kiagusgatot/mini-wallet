<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class PinController extends Controller
{
    public function createPin(Request $request)
    {
        $request->validate([
            'pin' => 'required|string|size:6|regex:/^[0-9]+$/'
        ]);

        $user = $request->user();
        $user->pin = Hash::make($request->pin);
        $user->pin_created_at = now();
        $user->save();

        return response()->json([
            'message' => 'PIN berhasil dibuat',
            'has_pin' => true
        ]);
    }

    public function loginWithPin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'pin' => 'required|string|size:6'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !$user->pin) {
            return response()->json([
                'message' => 'Akun tidak ditemukan atau belum mengatur PIN'
            ], 401);
        }

        if (!Hash::check($request->pin, $user->pin)) {
            return response()->json([
                'message' => 'PIN salah'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function status(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email tidak terdaftar'
            ], 404);
        }

        return response()->json([
            'exists' => true,
            'has_pin' => !empty($user->pin)
        ]);
    }
}
