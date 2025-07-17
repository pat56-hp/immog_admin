<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Facture extends Model
{
    use SoftDeletes;

    protected $appends = ['user_name', 'user_type', 'type', 'montant_formatted'];
    protected $fillable = [
        'ref',
        'type_model_type',
        'type_model_id',
        'montant',
        'type_user_type',
        'type_user_id',
        'statut',
        'etat',
        'date_emission',
        'date_echeance'
    ];

    //Génération automatique de la reference de la facture lors de la creation
    protected static function booted()
    {
        static::creating(function ($facture) {
            //Verification de l'unicité de la reference
            do {
                $ref = 'FT-' . strtoupper(Str::random(8));
            } while (Facture::where('ref', $ref)->exists());

            $facture->ref = $ref;
        });

        static::deleting(function ($facture) {
            //On supprime les elements
            $facture->elements()->delete();
        });
    }

    public function elements()
    {
        return $this->hasMany(Element::class);
    }

    public function getTypeRefAttribute()
    {
        return $this->typeModel->ref ?? 'N/A';
    }

    public function typeModel()
    {
        return $this->morphTo();
    }

    public function typeUser()
    {
        return $this->morphTo();
    }

    public function getUserNameAttribute(): string
    {
        return $this->typeUser->nom_complet;
    }

    public function getTypeAttribute(): string
    {
        return match ($this->type_model_type) {
            "App\Models\Contrat" => 'Contrat',
            "App\Models\Abonnement" => 'Abonnement',
            default => 'Autre',
        };
    }

    public function getUserTypeAttribute(): string
    {
        return match ($this->type_user_type) {
            "App\\Models\\Locataire" => 'Locataire',
            "App\\Models\\Proprietaire" => 'Proprietaire',
            default => 'Autre',
        };
    }

    public function getMontantFormattedAttribute(): string
    {
        return number_format($this->montant, 0, '.', ' ') . ' FCFA';
    }
}
