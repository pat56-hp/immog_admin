<?php

use App\Http\Controllers\Utilisateurs\LocataireController;
use Illuminate\Support\Facades\Route;

// Routes pour les locataires
Route::resource('locataires', LocataireController::class);
Route::patch('locataires/{locataire}/status', [LocataireController::class, 'editStatus'])->name('locataires.status');
