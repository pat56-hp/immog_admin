<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appartement extends Model
{
    use HasFactory;

    protected $appends = [
        'statut_formatted',
        'loyer_formatted',
        'superficie_formatted',
        'charges_formatted',
        'proprietaire_name',
        'type_libelle',
        'picture',
    ];

    protected $fillable = [
        'proprietaire_id',
        'type_appartement_id',
        'libelle',
        'description',
        'adresse',
        'ville',
        'pays',
        'superficie',
        'nombre_pieces',
        'nombre_sdb',
        'loyer_mensuel',
        'charges_incluses',
        'statut',
        'photos'
    ];

    protected $casts = [
        'superficie' => 'integer',
        'nombre_pieces' => 'integer',
        'nombre_sdb' => 'integer',
        'loyer_mensuel' => 'decimal:2',
        'charges_incluses' => 'boolean',
        'photos' => 'array',
        'created_at' => 'datetime'
    ];

    /**
     * Relation avec le propriétaire
     */
    public function proprietaire(): BelongsTo
    {
        return $this->belongsTo(Proprietaire::class);
    }

    /**
     * Relation avec le type d'appartement
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(TypeAppartement::class, 'type_appartement_id');
    }

    /**
     * Accesseur pour le nom du propriétaire
     *
     * @return string
     */
    public function getProprietaireNameAttribute(): string
    {
        return $this->proprietaire->name ?? 'Inconnu';
    }

    /**
     * Accesseur pour le nom du type d'appartement
     *
     * @return string
     */
    public function getTypeLibelleAttribute(): string
    {
        return $this->type->libelle ?? 'Inconnu';
    }

    /**
     * Accesseur pour le statut formaté
     */
    public function getStatutFormattedAttribute(): string
    {
        return match ($this->statut) {
            'disponible' => 'Disponible',
            'occupé' => 'Occupé',
            'en maintenance' => 'En maintenance',
            default => 'Inconnu'
        };
    }

    /**
     * Accesseur pour le loyer formaté
     */
    public function getLoyerFormattedAttribute(): string
    {
        return number_format($this->loyer_mensuel, 0, '.', ' ') . ' FCFA';
    }

    /**
     * Accesseur pour la superficie formatée
     */
    public function getSuperficieFormattedAttribute(): string
    {
        return $this->superficie . ' m²';
    }

    /**
     * Accesseur pour les charges formatées
     */
    public function getChargesFormattedAttribute(): string
    {
        return $this->charges_incluses ? 'Incluses' : 'Non incluses';
    }

    public function getPictureAttribute(): string
    {
        if (!empty($this->photos)) {
            $photos = json_decode($this->photos);
            return $photos[0];
        }

        return asset('images/appart.png');
    }
}
