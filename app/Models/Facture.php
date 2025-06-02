<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Facture extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'ref',
        'type',
        'type_id',
        'montant',
        'user_type',
        'user_id',
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
        match ($this->type) {
            'contrat' => $this->belongsTo(Contrat::class, 'type_id'),
            'abonnement' => null,
            'loyer' => null
        };
    }

    public function typeUser()
    {
        return match ($this->user_type) {
            'proprietaire' => $this->belongsTo(Proprietaire::class, 'user_id'),
            'locataire' => $this->belongsTo(Locataire::class, 'user_id'),
            default => null
        };
    }
}
