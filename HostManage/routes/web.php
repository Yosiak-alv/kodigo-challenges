<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Models\Accommodation;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'accommodations' => Accommodation::all()
    ]);
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', function (){
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('reservations', ReservationController::class)->except('show', 'edit', 'update');
    Route::resource('accommodations', AccommodationController::class)->except('show');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
