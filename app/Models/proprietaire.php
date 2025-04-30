<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proprietaire extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'picture',
        'type',
        'status'
    ];

    public function setStatusAttribute($value)
    {
        return $this->attributes['status'] = $value === 1 ? 'Actif' : 'Inactif';
    }

    public function setTypeAttribute($value)
    {
        return $this->attributes['type'] = ucfirst($value);
    }
}
