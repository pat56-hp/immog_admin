<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'libelle' => 'Administrateur',
                'status' => 1,
                'created_by' => 'admin'
            ],
            [
                'libelle' => 'Superviseur',
                'status' => 1,
                'created_by' => 'admin'
            ],
            [
                'libelle' => 'Commercial',
                'status' => 1,
                'created_by' => 'admin'
            ]
        ];
        
        foreach ($roles as $role) {
            \App\Models\Role::create($role);
        }
    }
}
