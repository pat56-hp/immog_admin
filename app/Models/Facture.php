<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Facture extends Model
{
    use SoftDeletes;

    protected $fillable = [
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
}
