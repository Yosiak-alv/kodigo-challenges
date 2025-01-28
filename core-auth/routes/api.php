<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1/')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
});

Route::prefix('v1/')->middleware(['auth:sanctum','check-token-expiration'])->group(function () {
    Route::post('refresh-token', [AuthController::class, 'refreshToken']);

    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
});
