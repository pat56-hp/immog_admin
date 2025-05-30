<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Contrat extends Model
{
    use SoftDeletes;

    protected $appends = ['debut', 'fin', 'proprietaire_name', 'locataire_name', 'loyer_formatted', 'periode', 'garantie_amount'];

    protected $fillable = [
        'ref',
        'locataire_id',
        'appartement_id',
        'garantie',
        'type', // Bail d'habitation, Bail commercial, Bail professionnel, Bail emphytéotique, Autre type
        'description',
        'date_debut',
        'date_fin',
        'statut',
    ];

    //Génération automatique de la reference du contrat lors de la creation
    protected static function booted()
    {
        static::creating(function ($contrat) {
            do {
                $ref = 'CT-' . strtoupper(Str::random(8));
            } while (Contrat::where('ref', $ref)->exists());

            $contrat->ref = $ref;
        });
    }

    public function locataire()
    {
        return $this->belongsTo(Locataire::class);
    }

    public function proprietaire()
    {
        return $this->hasOneThrough(
            Proprietaire::class,
            Appartement::class,
            'id',
            'id',
            'appartement_id',
            'proprietaire_id'
        );
    }

    public function appartement()
    {
        return $this->belongsTo(Appartement::class);
    }

    public function getDebutAttribute(): string
    {
        $date = Carbon::parse($this->date_debut)->locale('fr');

        $jour = $date->day === 1 ? '1er' : $date->day;
        $moisAnnee = $date->translatedFormat('M Y'); // Mois & Annee : Mai 2025

        return "{$jour} {$moisAnnee}";
    }

    public function getFinAttribute(): string
    {
        $date = Carbon::parse($this->date_fin)->locale('fr');

        $jour = $date->day === 1 ? '1er' : $date->day;
        $moisAnnee = $date->translatedFormat('M Y'); // Mois & Annee : Mai 2025

        return "{$jour} {$moisAnnee}";
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
        return $this->appartement->loyer_formatted ?? 'N/A';
    }

    public function getPeriodeAttribute(): string
    {
        return 'Du ' . date('d-m-Y', strtotime($this->date_debut)) . ' au ' . date('d-m-Y', strtotime($this->date_fin));
    }

    public function getGarantieAmountAttribute(): string
    {
        return number_format($this->garantie * $this->loyer, 0, '.', ' ') . ' FCFA';
    }
}
