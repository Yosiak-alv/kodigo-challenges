<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //User::factory(10)->create();
        User::create([
            'name' => 'Administrator',
            'email' => 'administrator@example.com',
            'role' => 'ADMIN',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Josias Alvarenga',
            'email' => 'josias@example.com',
            'password' => bcrypt('password'),
        ]);
    }
}
