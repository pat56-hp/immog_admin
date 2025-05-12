<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeAppartement extends Model
{
    protected $appends = [
        'status_name'
    ];

    protected $fillable = [
        'libelle',
        'description',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function getStatusNameAttribute()
    {
        return $this->status ? 'Actif' : 'Inactif';
    }

    public function appartements(): HasMany
    {
        return $this->hasMany(Appartement::class, 'type_appartement_id');
    }
}
