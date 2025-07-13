<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            'name' => 'ImmoG',
            'phone' => '+2250708377751',
            'address' => 'Abidjan, Côte d\'Ivoire',
            'logo' => asset('/images/logo.png'),
            'favicon' => asset('/images/logo.png'),
        ]);
    }
}
