<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PuzzleController;
use App\Http\Controllers\UserController;
use App\Models\Puzzle;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', [PuzzleController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// User management routes
Route::middleware('auth')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
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
Route::get('/', [PuzzleController::class, 'index'])->name('puzzles.index');
Route::get('/{id?}', [PuzzleController::class, 'show'])->where('id', '[0-9]+')->name('puzzles.show');
Route::post('/puzzles/check', [PuzzleController::class, 'checkAnswer'])->name('puzzles.check');

require __DIR__.'/auth.php';