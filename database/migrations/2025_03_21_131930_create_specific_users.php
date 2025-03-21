<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create specific users
        $users = [
            [
                'name' => 'tfara',
                'email' => 'tfara@cluco.io',
                'password' => Hash::make('Cluco2025^'),
                'email_verified_at' => now(),
            ],
            [
                'name' => 'bbowden',
                'email' => 'bbowden@cluco.io',
                'password' => Hash::make('Cluco2025^'),
                'email_verified_at' => now(),
            ],
            [
                'name' => 'eedwards',
                'email' => 'eedwards@cluco.io',
                'password' => Hash::make('Cluco2025^'),
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $userData) {
            // Only create if user doesn't exist
            if (!User::where('email', $userData['email'])->exists()) {
                User::create($userData);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove the users if needed
        User::whereIn('email', [
            'tfara@cluco.io',
            'bbowden@cluco.io',
            'eedwards@cluco.io',
        ])->delete();
    }
};