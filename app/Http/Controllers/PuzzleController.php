<?php

namespace App\Http\Controllers;

use App\Models\Puzzle;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PuzzleController extends Controller
{
    /**
     * Display a list of all puzzles.
     */
    public function index()
    {
        // Fetch all puzzles from the database
        $puzzles = Puzzle::all()->map(function ($puzzle) {
            return [
                'id' => $puzzle->id,
                'number' => str_pad($puzzle->id, 2, '0', STR_PAD_LEFT),
                'name' => $puzzle->puzzle_name,
                'solved' => $puzzle->solved,
            ];
        });

        return Inertia::render('PuzzleList', [
            'puzzles' => $puzzles
        ]);
    }

    /**
     * Display the specified puzzle.
     */
    public function show($id = null)
    {
        // Find the puzzle by ID or get the first one if no ID is provided
        $puzzleModel = $id ? Puzzle::findOrFail($id) : Puzzle::first();

        // Format the puzzle data for the frontend
        $puzzle = [
            'id' => $puzzleModel->id,
            'number' => str_pad($puzzleModel->id, 2, '0', STR_PAD_LEFT),
            'name' => $puzzleModel->puzzle_name,
            'solved' => $puzzleModel->solved,
            'videoUrl' => $puzzleModel->video_url,
            'answer' => $puzzleModel->answer, // This would normally be removed in production
            'duration' => '3:50' // You might want to add this to your database schema
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
        // Log for debugging
        Log::info('Answer check request received', $request->all());

        $validated = $request->validate([
            'answer' => 'required|string',
            'puzzleId' => 'required|numeric'
        ]);

        try {
            // Get the puzzle from the database
            $puzzle = Puzzle::findOrFail($validated['puzzleId']);

            // Check if the answer is correct (case insensitive)
            $isCorrect = strtolower(trim($validated['answer'])) === strtolower(trim($puzzle->answer));

            if ($isCorrect) {
                // Update the puzzle to be marked as solved
                $puzzle->update(['solved' => true]);

                return redirect()->back()->with('success', 'Correct answer! Puzzle solved.');
            } else {
                return redirect()->back()->with('error', 'Incorrect answer, try again.');
            }

        } catch (Exception $e) {
            // Log any exceptions
            Log::error('Error in checkAnswer', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()->with('error', 'An error occurred while checking your answer.');
        }
    }
}
