<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Patrick Aimé',
            'email' => 'pataime56@gmail.com',
            'role_id' => 1 ,//Admin
            'phone' => '+2250708377751',
            'password' => Hash::make(123456)
        ]);
    }
}
