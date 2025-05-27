<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Locataire extends Model
{
    use HasFactory, Notifiable;

    protected $appends = [
        'nom_complet',
        'image',
        'status_name'
    ];

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'adresse',
        'date_naissance',
        'profession',
        'picture',
        'justificatif_identite',
        'status',
        'notes'
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'status' => 'boolean',
        'created_at' => 'datetime'
    ];

    /**
     * Relation avec les appartements loués
     */
    public function appartements(): HasMany
    {
        return $this->hasMany(Appartement::class);
    }

    /**
     * Accesseur pour le nom complet
     * 
     * @return string
     */
    public function getNomCompletAttribute(): string
    {
        return ucwords($this->prenom . ' ' . $this->nom);
    }

    public function getNameAttribute(): string
    {
        return ucwords($this->prenom . '' . $this->nom);
    }

    /**
     * Accesseur pour l'image
     *
     * @return string
     */
    public function getImageAttribute(): string
    {
        return $this->picture ?? asset('images/person.png');
    }

    /**
     * Accesseur pour le nom du statut
     *
     * @return string
     */
    public function getStatusNameAttribute(): string
    {
        return $this->status ? 'Actif' : 'Inactif';
    }
}
