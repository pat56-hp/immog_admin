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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
