<?php

use App\Http\Controllers\DesenvolvedorController;
use App\Http\Controllers\NivelController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "desenvolvedores"], function () {
    Route::get('', [DesenvolvedorController::class, 'index']);
    Route::get('/{id}', [DesenvolvedorController::class, 'show']);
    Route::post('', [DesenvolvedorController::class, 'store']);
    Route::match(['put', 'patch'], '/{id}', [DesenvolvedorController::class, 'update']);
    Route::delete('/{id}', [DesenvolvedorController::class, 'destroy']);
});


Route::group(["prefix" => "niveis"], function () {
    Route::get('', [NivelController::class, 'index']);
    Route::get('/{id}', [NivelController::class, 'show']);
    Route::post('', [NivelController::class, 'store']);
    Route::match(['put', 'patch'], '/{id}', [NivelController::class, 'update']);
    Route::delete('/{id}', [NivelController::class, 'destroy']);
});