<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocataireRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telephone' => 'required|string|max:20|min:6',
            'adresse' => 'nullable|string',
            'date_naissance' => 'nullable|date',
            'profession' => 'nullable|string|max:255',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'justificatif_identite' => 'nullable',
            'notes' => 'nullable|string'
        ];

        // Si c'est une mise à jour, on ignore l'unicité de l'email pour le locataire actuel
        if ($this->isMethod('PUT')) {
            $rules['telephone'] = 'required|min:6|max:20|unique:locataires,telephone,' . $this->locataire->id;
        } else {
            $rules['telephone'] = 'required|min:6|max:20|unique:locataires,telephone';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire',
            'prenom.required' => 'Le prénom est obligatoire',
            'email.required' => 'L\'email est obligatoire',
            'email.email' => 'L\'email doit être valide',
            'telephone.unique' => 'Ce numéro de téléphone est déjà utilisé',
            'telephone.required' => 'Le numéro de téléphone est obligatoire',
            'telephone.min' => 'Le numéro de téléphone doit avoir 6 caractères au minimum',
            'picture.image' => 'Le fichier doit être une image',
            'picture.mimes' => 'L\'image doit être au format jpeg, png ou jpg',
            'picture.max' => 'L\'image ne doit pas dépasser 2Mo',
            'justificatif_identite.file' => 'Le fichier doit être un document valide',
            'justificatif_identite.mimes' => 'Le document doit être au format PDF, JPG, JPEG ou PNG',
            'justificatif_identite.max' => 'Le document ne doit pas dépasser 5Mo'
        ];
    }
}
