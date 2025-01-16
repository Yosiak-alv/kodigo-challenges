<?php

use App\Http\Controllers\QueryBuilderController;
use Illuminate\Support\Facades\Route;


Route::post('/challenge1', [QueryBuilderController::class, 'challenge1']);
Route::get('/challenge2', [QueryBuilderController::class, 'challenge2']);
Route::get('/challenge3', [QueryBuilderController::class, 'challenge3']);
Route::get('/challenge4', [QueryBuilderController::class, 'challenge4']);
Route::get('/challenge5', [QueryBuilderController::class, 'challenge5']);
Route::get('/challenge6', [QueryBuilderController::class, 'challenge6']);
Route::get('/challenge7', [QueryBuilderController::class, 'challenge7']);
Route::get('/challenge8', [QueryBuilderController::class, 'challenge8']);
Route::get('/challenge9', [QueryBuilderController::class, 'challenge9']);
Route::get('/challenge10', [QueryBuilderController::class, 'challenge10']);
