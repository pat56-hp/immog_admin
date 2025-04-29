<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeAppartement extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status'
    ];
}
