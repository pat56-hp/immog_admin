<?php

use App\Http\Controllers\Appartement\AppartementController as AppartementAppartementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('appartements', AppartementAppartementController::class);
    Route::put('appartements/{appartement}/status', [AppartementAppartementController::class, 'status'])->name('appartements.status');
});
