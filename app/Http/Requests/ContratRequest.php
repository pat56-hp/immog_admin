<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContratRequest extends FormRequest
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
            //'proprietaire_id' => 'required|exists:proprietaires,id',
            'locataire_id' => 'required|exists:locataires,id',
            'appartement_id' => 'required|exists:appartements,id',
            'type' => 'required|string',
            'garantie' => 'required|interger',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'description' => 'required'
        ];
    }
}
