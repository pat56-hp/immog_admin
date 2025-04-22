<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => ['required', 'email', request()->method('POST') ? Rule::unique('users') : Rule::unique('users')->ignore(request('user'))],
            'phone' => 'nullable',
            'status' => 'nullable',
            'role' => 'required',
            'password' => [request()->method('POST') ? 'required' : 'sometimes', Password::defaults()]
        ];
    }
}
