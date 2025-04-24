<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'name',
        'logo',
        'favicon',
        'email',
        'phone',
        'address',
        'description',
        'keywords',
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'localisation',
        'site_url',
    ];
}
