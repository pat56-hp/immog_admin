<?php

namespace App\Http\Requests;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
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
        $setting = Setting::first();
        return [
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'tweeter' => 'nullable|string|max:255',
            'keywords' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'logo' => empty($setting?->logo) ? ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'] : ['nullable'],
            'favicon' => empty($setting?->favicon) ? ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'] : ['nullable'],
        ];
    }
}
