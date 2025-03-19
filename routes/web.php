<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PuzzleController;
use App\Models\Puzzle;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    // Add debugging to see raw data
    \Log::info('Raw puzzles data:', ['count' => Puzzle::count(), 'sample' => Puzzle::first()]);
    
    $puzzles = Puzzle::all()->map(function ($puzzle) {
        return [
            'id' => $puzzle->id,
            'number' => str_pad($puzzle->id, 2, '0', STR_PAD_LEFT),
            // Fix the property name to match your component expectation
            'name' => $puzzle->puzzle_name, // This needs to match what your component expects
            'solved' => $puzzle->solved,
            'answer' => $puzzle->answer,
        ];
    });
    
    // Debug the transformed data
    \Log::info('Transformed puzzles data:', ['count' => $puzzles->count()]);
    
    return Inertia::render('Dashboard', [
        'puzzles' => $puzzles
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Puzzle management routes (require authentication)
Route::middleware('auth')->group(function () {
    Route::delete('/puzzles/{id}', [PuzzleController::class, 'destroy'])->name('puzzles.destroy');
    Route::get('/puzzles/create', [PuzzleController::class, 'create'])->name('puzzles.create');
    Route::post('/puzzles', [PuzzleController::class, 'store'])->name('puzzles.store');
    Route::get('/puzzles/{id}/edit', [PuzzleController::class, 'edit'])->name('puzzles.edit');
    Route::put('/puzzles/{id}', [PuzzleController::class, 'update'])->name('puzzles.update');
});

// Public puzzle routes (no authentication required)
Route::get('/puzzles', [PuzzleController::class, 'index'])->name('puzzles.index');
Route::get('/puzzle/{id?}', [PuzzleController::class, 'show'])->name('puzzles.show');
Route::post('/puzzles/check', [PuzzleController::class, 'checkAnswer'])->name('puzzles.check');

require __DIR__.'/auth.php';