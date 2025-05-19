<?php

use App\Http\Controllers\Biens\Appartements\AppartementController;
use App\Http\Controllers\Biens\Appartements\TypeAppartementController;
use Illuminate\Support\Facades\Route;

Route::resource('appartements', AppartementController::class)->only(['index', 'create', 'store', 'destroy', 'edit', 'update', 'show']);

Route::prefix('appartements')->group(function () {
    Route::prefix('types')->group(function () {
        Route::get('/liste', [TypeAppartementController::class, 'index'])->name('appartements.types.index');
        Route::get('/create', [TypeAppartementController::class, 'create'])->name('appartements.types.create');
        Route::post('/store', [TypeAppartementController::class, 'store'])->name('appartements.types.store');
        Route::patch('/{typeAppartement}', [TypeAppartementController::class, 'update'])->name('appartements.types.update');
        Route::delete('/{typeAppartement}', [TypeAppartementController::class, 'destroy'])->name('appartements.types.delete');
        Route::patch('/{typeAppartement}/status', [TypeAppartementController::class, 'status'])->name('appartements.types.status');
    });
});
