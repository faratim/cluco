<?php

namespace App\Http\Controllers;

use App\Models\Puzzle;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

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
            'answer' => $puzzleModel->answer, // Note: You might want to remove this in production
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

                // Get the updated puzzle
                $puzzle = $puzzle->fresh();
            }

            // Format the puzzle data for the frontend
            $puzzleData = [
                'id' => $puzzle->id,
                'number' => str_pad($puzzle->id, 2, '0', STR_PAD_LEFT),
                'name' => $puzzle->puzzle_name,
                'solved' => $isCorrect ? true : $puzzle->solved, // Only update if the answer was correct
                'videoUrl' => $puzzle->video_url,
                'answer' => $puzzle->answer,
                'duration' => '3:50'
            ];

            // Return to the same page with the updated puzzle data
            return back()->with([
                'puzzle' => $puzzleData,
                'success' => $isCorrect ? 'Correct answer! Puzzle solved.' : null,
                'error' => !$isCorrect ? 'Incorrect answer, try again.' : null,
            ]);

        } catch (Exception $e) {
            // Log any exceptions
            Log::error('Error in checkAnswer', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'An error occurred while checking your answer.');
        }
    }
}
