<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'user_id',
        'ip',
        'navigator',
        'action',
        'country',
        'country_code',
        'url'
    ];

    protected $appends = [
        'user_name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUserNameAttribute()
    {
        return $this->user->name ?? 'Utilisateur introuvable';
    }
}
