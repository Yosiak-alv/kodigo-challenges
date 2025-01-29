<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1/')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login'])->name('login');
});
//->middleware(['auth:sanctum','check-token-expiration'])
Route::prefix('v1/')->middleware(['auth:sanctum'])->group(function () {
    Route::post('auth/refresh-token', [AuthController::class, 'refreshToken']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'getCurrentUser']);

    Route::get('/users/dashboard', [UserController::class, 'dashboard']);
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{user}', [UserController::class, 'show']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{user}', [UserController::class, 'update']);
    Route::delete('users/{user}', [UserController::class, 'destroy']);
});
