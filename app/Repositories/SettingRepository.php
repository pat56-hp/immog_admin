<?php

namespace App\Repositories;

use App\Models\Setting;
use App\Repositories\Interfaces\SettingInterface;

class SettingRepository implements SettingInterface {

    public function __construct(private Setting $setting){}

    public function store(array $data){
        $setting = $this->setting->first();
        $this->setting->updateOrCreate(['id' => $setting->id ?? 0], $data);
    }
}