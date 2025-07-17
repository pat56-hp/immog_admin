<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Proprietaire extends Model
{
    use Notifiable;

    protected $appends = [
        'image',
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'picture',
        'type',
        'status'
    ];

    public function appartements()
    {
        return $this->hasMany(Appartement::class);
    }

    public function type(): Attribute
    {
        return Attribute::make(get: fn($value) => ucfirst($value));
    }

    public function getImageAttribute()
    {
        return $this->picture ?? asset('/images/person.png');
    }

    public function address(): Attribute
    {
        return Attribute::make(get: fn($value) => !empty($value) ? $value : 'Inconnue');
    }

    public function getNomCompletAttribute(): string
    {
        return $this->name;
    }
}
