<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Element extends Model
{
    use SoftDeletes;

    protected $fillable = ['libelle', 'montant', 'facture_id'];

    public function facture()
    {
        return $this->belongsTo(Facture::class);
    }
}
