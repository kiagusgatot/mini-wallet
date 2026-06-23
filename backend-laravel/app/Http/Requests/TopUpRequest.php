<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TopUpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'amount' => ['required', 'integer', 'min:1', 'max:10000000'],
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required' => 'Nominal tidak boleh kosong.',
            'amount.integer'  => 'Nominal harus berupa angka.',
            'amount.min'      => 'Nominal harus lebih dari 0.',
            'amount.max'      => 'Nominal melebihi batas maksimum transaksi.',
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
