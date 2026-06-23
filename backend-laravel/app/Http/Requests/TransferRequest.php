<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TransferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'recipient' => ['required', 'string'],
            'amount'    => ['required', 'integer', 'min:1', 'max:10000000'],
            'note'      => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'recipient.required' => 'Penerima tidak boleh kosong.',
            'amount.required'    => 'Nominal tidak boleh kosong.',
            'amount.integer'     => 'Nominal harus berupa angka.',
            'amount.min'         => 'Nominal harus lebih dari 0.',
            'amount.max'         => 'Nominal melebihi batas maksimum transaksi.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validasi gagal.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}
