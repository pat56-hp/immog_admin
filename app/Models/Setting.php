<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Setting extends Model
{

    protected $appends = [
        'logo_url', 'favicon_url'
    ];
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
        'site_url',
    ];

    public function getLogoUrlAttribute(){
        if (!empty($this->logo)) {
            return Storage::url($this->logo);
        }
        
        return asset('images/logo.png');
    }

    public function getFaviconUrlAttribute(){
        if (!empty($this->favicon)) {
            return Storage::url($this->favicon);
        }

        return asset('images/logo.png');
    }
}
