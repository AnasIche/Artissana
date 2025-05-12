<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //The admin user is created in the UserSeeder
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin@gmail.com',
            'phone' => '0625994563',
            'password' => 'admin123', // automatiquement hashé avec le cast dans le modèle
            'role' => 'administrateur',
        ]);

    }
}
