<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contrat extends Model
{
    protected $appends = ['debut', 'fin'];

    protected $fillable = [
        'locataire_id',
        'appartement_id',
        'date_debut',
        'date_fin',
        'loyer',
        'statut',
    ];

    public function locataire()
    {
        return $this->belongsTo(Locataire::class);
    }

    public function appartement()
    {
        return $this->belongsTo(Appartement::class);
    }

    public function getDebutAttribute(): string
    {
        return date('d/m/Y', strtotime($this->date_debut));
    }

    public function getFinAttribute(): string
    {
        return date('d/m/Y', strtotime($this->date_fin));
    }
}
