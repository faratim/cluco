<?php

namespace App\Http\Controllers;

use App\Models\Puzzle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PuzzleController extends Controller
{
    /**
     * Display a list of all puzzles.
     */
    public function index()
    {
        // For testing, use mock data
        // In production, you'd fetch from database: Puzzle::all()
        $puzzles = [
            ['id' => 1, 'number' => '01', 'name' => 'PUZZLE NAME', 'solved' => true],
            ['id' => 2, 'number' => '02', 'name' => 'PUZZLE NAME', 'solved' => true],
            ['id' => 3, 'number' => '03', 'name' => 'PUZZLE NAME', 'solved' => true],
            ['id' => 4, 'number' => '04', 'name' => 'PUZZLE NAME', 'solved' => false],
            ['id' => 5, 'number' => '05', 'name' => 'PUZZLE NAME', 'solved' => true],
            ['id' => 6, 'number' => '06', 'name' => 'PUZZLE NAME', 'solved' => true],
            ['id' => 7, 'number' => '07', 'name' => 'PUZZLE NAME', 'solved' => false],
            ['id' => 8, 'number' => '08', 'name' => 'PUZZLE NAME', 'solved' => false],
            ['id' => 9, 'number' => '09', 'name' => 'PUZZLE NAME', 'solved' => true],
            ['id' => 10, 'number' => '10', 'name' => 'PUZZLE NAME', 'solved' => false],
            // Add more dummy puzzles as needed
        ];

        return Inertia::render('PuzzleList', [
            'puzzles' => $puzzles
        ]);
    }

    /**
     * Display the specified puzzle.
     */
    public function show($id = null)
    {
        // For testing, use mock data
        // In production, you'd fetch from database: Puzzle::findOrFail($id)
        $puzzle = [
            'id' => $id ?? 1,
            'number' => $id ?? 1,
            'name' => 'Sample Puzzle',
            'solved' => false,
            'videoUrl' => 'https://www.youtube.com/watch?v=8XKubqcgJxU',
            'captionsUrl' => '',
            'duration' => '3:50'
        ];

        return Inertia::render('PuzzleView', [
            'puzzle' => $puzzle
        ]);
    }

    /**
     * Check if the submitted answer is correct.
     */
    public function checkAnswer(Request $request)
    {
        $validated = $request->validate([
            'answer' => 'required|string',
            'puzzleId' => 'required|numeric'
        ]);

        // In production, you'd check against the database
        // $puzzle = Puzzle::findOrFail($validated['puzzleId']);
        // $isCorrect = strtolower(trim($validated['answer'])) === strtolower(trim($puzzle->answer));

        // For testing, let's say "cluco" is the correct answer
        $isCorrect = strtolower(trim($validated['answer'])) === 'cluco';

        if ($isCorrect) {
            // In production, you'd update the database
            // $puzzle->update(['solved' => true]);

            return redirect()->back()->with('success', 'Correct answer!');
        }

        return redirect()->back()->with('error', 'Incorrect answer, try again.');
    }
}
