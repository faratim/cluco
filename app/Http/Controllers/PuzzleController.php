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
            'answer' => $puzzleModel->answer,
            'duration' => '3:50' // You might want to add this to your database schema
        ];

        return Inertia::render('PuzzleView', [
            'puzzle' => $puzzle
        ]);
    }

    /**
     * Show the form for creating a new puzzle.
     */
    public function create()
    {
        return Inertia::render('Puzzles/Create');
    }

    /**
     * Store a newly created puzzle in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'puzzle_name' => 'required|string|max:255',
            'video_url' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
        ]);

        Puzzle::create($validated);

        return redirect()->route('dashboard')->with('success', 'Puzzle created successfully!');
    }

    /**
     * Show the form for editing the specified puzzle.
     */
    public function edit($id)
    {
        $puzzle = Puzzle::findOrFail($id);
        
        return Inertia::render('Puzzles/Edit', [
            'puzzle' => $puzzle
        ]);
    }

    /**
     * Update the specified puzzle in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'puzzle_name' => 'required|string|max:255',
            'video_url' => 'required|string|max:255',
            'answer' => 'required|string|max:255',
            'solved' => 'boolean',
        ]);

        $puzzle = Puzzle::findOrFail($id);
        $puzzle->update($validated);

        return redirect()->route('dashboard')->with('success', 'Puzzle updated successfully!');
    }

    /**
     * Remove the specified puzzle from storage.
     */
    public function destroy($id)
    {
        try {
            $puzzle = Puzzle::findOrFail($id);
            $puzzle->delete();
            
            return redirect()->route('dashboard')->with('success', 'Puzzle deleted successfully!');
        } catch (Exception $e) {
            Log::error('Error deleting puzzle', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->route('dashboard')->with('error', 'Error deleting puzzle. Please try again.');
        }
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

    /**
 * Display the dashboard with puzzles list.
 */
public function dashboard()
{
    // Log raw database query results
    $rawPuzzles = Puzzle::all();

    Log::info('Raw puzzles DB query:', [
        'count' => $rawPuzzles->count(),
        'empty' => $rawPuzzles->isEmpty(),
        'first_record' => $rawPuzzles->first()
    ]);
    
    // Fetch all puzzles from the database with formatted data
    $puzzles = $rawPuzzles->map(function ($puzzle) {
        return [
            'id' => $puzzle->id,
            'number' => str_pad($puzzle->id, 2, '0', STR_PAD_LEFT),
            'name' => $puzzle->puzzle_name,
            'solved' => $puzzle->solved,
            'answer' => $puzzle->answer,
        ];
    });
    
    // Log the final array being passed to the component
    Log::info('Final puzzles array:', [
        'count' => $puzzles->count(),
        'isEmpty' => $puzzles->isEmpty(),
        'data' => $puzzles->toArray()
    ]);
    
    return Inertia::render('Dashboard', [
        'puzzles' => $puzzles
    ]);
}
}