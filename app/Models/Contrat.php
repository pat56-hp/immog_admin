<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contrat extends Model
{
    use SoftDeletes;

    protected $appends = ['debut', 'fin', 'proprietaire_name', 'locataire_name', 'loyer_formatted', 'periode'];

    protected $fillable = [
        'ref',
        'locataire_id',
        'appartement_id',
        'description',
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

    public function getPeriodeAttribute(): string
    {
        return 'Du ' . date('d-m-Y', strtotime($this->date_debut)) . ' au ' . date('d-m-Y', strtotime($this->date_fin));
    }
}
