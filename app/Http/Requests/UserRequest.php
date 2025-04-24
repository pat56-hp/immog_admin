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
            'email' => ['required', 'email', request()->method() === 'POST' ? Rule::unique('users', 'email') : Rule::unique('users', 'email')->ignore(request('user'))],
            'phone' => ['nullable', 'string'],
            'status' => ['nullable', 'boolean'],
            'role' => ['required', 'exists:roles,id'],
            'password' => [request()->method() === 'POST' ? 'required' : 'nullable', Password::default()]
        ];
    }
}
