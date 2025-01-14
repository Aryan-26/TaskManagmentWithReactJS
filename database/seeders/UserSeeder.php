<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
   
    public function run(): void
    {
        User::create([
        'id' => Str::uuid(),
        'name'=>'Admin',
        'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => UserRole::Admin,
         
        ]);

         User::create([
            'id' => Str::uuid(),
            'name' => 'Client User',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::Client,
        ]);

        User::create([
            'id' => Str::uuid(),
            'name' => 'Employee User',
            'email' => 'employee@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::Employee,
        ]);
    }
}
