<?php

namespace Database\Factories;

use App\Models\Puzzle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Puzzle>
 */
class PuzzleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Puzzle::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'puzzle_name' => 'PUZZLE '.strtoupper($this->faker->words(3, true)),
            'video_url' => 'https://www.youtube.com/watch?v='.$this->faker->regexify('[A-Za-z0-9_-]{11}'),
            'answer' => strtolower($this->faker->word()),
            'solved' => $this->faker->boolean(30), // 30% chance of being solved
        ];
    }

    /**
     * Indicate that the puzzle is solved.
     */
    public function solved(): static
    {
        return $this->state(fn(array $attributes) => [
            'solved' => true,
        ]);
    }

    /**
     * Indicate that the puzzle is unsolved.
     */
    public function unsolved(): static
    {
        return $this->state(fn(array $attributes) => [
            'solved' => false,
        ]);
    }
}
