<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contrat extends Model
{
    protected $appends = ['debut', 'fin', 'proprietaire_name', 'locataire_name'];

    protected $fillable = [
        'ref',
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

    public function proprietaire()
    {
        return $this->belongsTo(Proprietaire::class);
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

    public function getProprietaireNameAttribute(): string
    {
        return $this->proprietaire->name ?? 'N/A';
    }

    public function getLocataireNameAttribute(): string
    {
        return $this->locataire->nom_complet ?? 'N/A';
    }

    public function getLoyerFormattedAttribute(): string
    {
        return number_format($this->loyer, 0, ' ');
    }
}
