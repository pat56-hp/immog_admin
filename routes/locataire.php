<?php

use App\Http\Controllers\Utilisateurs\LocataireController;
use Illuminate\Support\Facades\Route;

// Routes pour les locataires
Route::resource('locataires', LocataireController::class);
Route::put('locataires/{locataire}/status', [LocataireController::class, 'editStatus'])->name('locataires.status');