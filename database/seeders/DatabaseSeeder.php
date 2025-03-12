<?php

namespace Database\Seeders;

use App\Models\Puzzle;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 15 puzzles
        Puzzle::factory(15)->create();

        // Optionally, add some specific puzzles
        Puzzle::factory()->create([
            'puzzle_name' => 'INTRO PUZZLE',
            'video_url' => 'https://www.youtube.com/watch?v=8XKubqcgJxU',
            'answer' => 'cluco',
            'solved' => false,
        ]);
    }
}
