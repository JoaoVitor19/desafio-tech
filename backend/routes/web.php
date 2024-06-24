<?php

use App\Http\Controllers\DesenvolvedorController;
use App\Http\Controllers\NivelController;
use Illuminate\Support\Facades\Route;

Route::get('/desenvolvedores', [DesenvolvedorController::class, 'index']);
Route::get('/desenvolvedores/{id}', [DesenvolvedorController::class, 'show']);
Route::post('/desenvolvedores', [DesenvolvedorController::class, 'store']);
Route::put('/desenvolvedores/{id}', [DesenvolvedorController::class, 'update']);
Route::delete('/desenvolvedores/{id}', [DesenvolvedorController::class, 'destroy']);

Route::get('/niveis', [NivelController::class, 'index']);
Route::get('/niveis/{id}', [NivelController::class, 'show']);
Route::post('/niveis', [NivelController::class, 'store']);
Route::put('/niveis/{id}', [NivelController::class, 'update']);
Route::delete('/niveis/{id}', [NivelController::class, 'destroy']);
