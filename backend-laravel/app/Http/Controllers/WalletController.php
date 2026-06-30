<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopUpRequest;
use App\Http\Requests\TransferRequest;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WalletController extends Controller
{
    public function balance(Request $request)
    {
        $wallet = $request->user()->wallet;
        if (!$wallet) {
            $wallet = $request->user()->wallet()->create(['balance' => 0]);
        }

        return response()->json([
            'balance' => $wallet->balance,
        ]);
    }

    public function topup(TopUpRequest $request)
    {
        $wallet = $request->user()->wallet;
        if (!$wallet) {
            $wallet = $request->user()->wallet()->create(['balance' => 0]);
        }

        $wallet->increment('balance', $request->amount);

        Transaction::create([
            'wallet_id' => $wallet->id,
            'type'      => 'topup',
            'amount'    => $request->amount,
            'note'      => 'Top-up saldo',
        ]);

        return response()->json([
            'message' => 'Top-up berhasil.',
            'balance' => $wallet->fresh()->balance,
        ]);
    }

    public function transfer(TransferRequest $request)
    {
        $senderWallet = $request->user()->wallet;
        if (!$senderWallet) {
            $senderWallet = $request->user()->wallet()->create(['balance' => 0]);
        }

        $recipient = User::where('email', $request->recipient)
            ->orWhere('phone', $request->recipient)
            ->first();

        if (!$recipient) {
            return response()->json(['message' => 'Penerima tidak ditemukan.'], 404);
        }

        if ($recipient->id === $request->user()->id) {
            return response()->json(['message' => 'Tidak bisa transfer ke diri sendiri.'], 400);
        }

        if ($senderWallet->balance < $request->amount) {
            return response()->json(['message' => 'Saldo tidak cukup.'], 400);
        }

        $recipientWallet = $recipient->wallet;

        DB::transaction(function () use ($senderWallet, $recipientWallet, $request) {
            $senderWallet->decrement('balance', $request->amount);
            $recipientWallet->increment('balance', $request->amount);

            Transaction::create([
                'wallet_id'         => $senderWallet->id,
                'type'              => 'transfer_out',
                'amount'            => $request->amount,
                'related_wallet_id' => $recipientWallet->id,
                'note'              => $request->note ?? 'Transfer keluar',
            ]);

            Transaction::create([
                'wallet_id'         => $recipientWallet->id,
                'type'              => 'transfer_in',
                'amount'            => $request->amount,
                'related_wallet_id' => $senderWallet->id,
                'note'              => $request->note ?? 'Transfer masuk',
            ]);
        });

        return response()->json([
            'message' => 'Transfer berhasil.',
            'balance' => $senderWallet->fresh()->balance,
        ]);
    }

    public function transactions(Request $request)
    {
        $wallet = $request->user()->wallet;
        if (!$wallet) {
            $wallet = $request->user()->wallet()->create(['balance' => 0]);
        }

        $transactions = $wallet
            ->transactions()
            ->latest('created_at')
            ->get();

        return response()->json(['transactions' => $transactions]);
    }
}
