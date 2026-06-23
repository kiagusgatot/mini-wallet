<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:100'],
            'username' => ['required', 'string', 'max:50', 'unique:users,username'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'phone'    => ['nullable', 'string', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.email'      => 'Format email tidak valid.',
            'email.unique'     => 'Email sudah terdaftar.',
            'password.min'     => 'Password minimal 8 karakter.',
            'username.unique'  => 'Username sudah digunakan.',
            'name.required'    => 'Nama tidak boleh kosong.',
            'username.required'=> 'Username tidak boleh kosong.',
            'email.required'   => 'Email tidak boleh kosong.',
            'password.required'=> 'Password tidak boleh kosong.',
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
