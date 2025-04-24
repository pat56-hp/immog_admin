<?php

namespace App\Repositories;

use App\Models\Setting;
use App\Repositories\Interfaces\SettingInterface;

class SettingRepository implements SettingInterface {

    public function __construct(private Setting $setting){}

    public function store(array $data){
        $this->setting->updateOrCreate($data);
    }
}