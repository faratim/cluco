<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PuzzleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Puzzle routes - don't require auth for now
Route::get('/', [PuzzleController::class, 'index'])->name('puzzles.index');
Route::get('/puzzle/{id?}', [PuzzleController::class, 'show'])->name('puzzles.show');
Route::post('/puzzles/check', [PuzzleController::class, 'checkAnswer'])->name('puzzles.check');

require __DIR__.'/auth.php';
