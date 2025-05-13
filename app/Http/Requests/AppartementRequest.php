<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppartementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'proprietaire_id' => 'required|exists:proprietaires,id',
            'type_appartement_id' => 'required|exists:type_appartements,id',
            'libelle' => 'required|string|max:255',
            'description' => 'nullable|string',
            'adresse' => 'required|string|max:255',
            'ville' => 'nullable|string|max:255',
            'pays' => 'required|string|max:255',
            'superficie' => 'required|integer|min:1',
            'nombre_pieces' => 'required|integer|min:1',
            'nombre_sdb' => 'required|integer|min:0',
            'loyer_mensuel' => 'required|numeric|min:0',
            'charges_incluses' => 'required|boolean',
            'statut' => 'required|in:disponible,occupé,en maintenance',
            'photos' => 'nullable|array',
            'photos.*' => 'nullable|string|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'proprietaire_id.required' => 'Le propriétaire est obligatoire',
            'proprietaire_id.exists' => 'Le propriétaire sélectionné n\'existe pas',
            'type_id.required' => 'Le type d\'appartement est obligatoire',
            'type_id.exists' => 'Le type d\'appartement sélectionné n\'existe pas',
            'nom.required' => 'Le nom de l\'appartement est obligatoire',
            'nom.max' => 'Le nom ne doit pas dépasser 255 caractères',
            'adresse.required' => 'L\'adresse est obligatoire',
            'adresse.max' => 'L\'adresse ne doit pas dépasser 255 caractères',
            'ville.max' => 'La ville ne doit pas dépasser 255 caractères',
            'pays.required' => 'Le pays est obligatoire',
            'pays.max' => 'Le pays ne doit pas dépasser 255 caractères',
            'superficie.required' => 'La superficie est obligatoire',
            'superficie.integer' => 'La superficie doit être un nombre entier',
            'superficie.min' => 'La superficie doit être supérieure à 0',
            'nombre_pieces.required' => 'Le nombre de pièces est obligatoire',
            'nombre_pieces.integer' => 'Le nombre de pièces doit être un nombre entier',
            'nombre_pieces.min' => 'Le nombre de pièces doit être supérieur à 0',
            'nombre_sdb.required' => 'Le nombre de salles de bain est obligatoire',
            'nombre_sdb.integer' => 'Le nombre de salles de bain doit être un nombre entier',
            'nombre_sdb.min' => 'Le nombre de salles de bain ne peut pas être négatif',
            'loyer_mensuel.required' => 'Le loyer mensuel est obligatoire',
            'loyer_mensuel.numeric' => 'Le loyer mensuel doit être un nombre',
            'loyer_mensuel.min' => 'Le loyer mensuel ne peut pas être négatif',
            'charges_incluses.required' => 'Le champ charges incluses est obligatoire',
            'charges_incluses.boolean' => 'Le champ charges incluses doit être vrai ou faux',
            'statut.required' => 'Le statut est obligatoire',
            'statut.in' => 'Le statut doit être disponible, occupé ou en maintenance',
            'photos.array' => 'Les photos doivent être un tableau',
            'photos.*.image' => 'Les photos doivent être des images valides'
        ];
    }
}
