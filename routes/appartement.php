<?php

use App\Http\Controllers\Appartements\AppartementController;
use App\Http\Controllers\Appartements\TypeAppartementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('appartements', AppartementController::class)->only(['index', 'create', 'store', 'destroy', 'edit', 'update', 'show']);

    Route::prefix('appartements')->group(function () {
        Route::prefix('types')->group(function () {
            Route::get('/', [TypeAppartementController::class, 'index'])->name('appartements.types.index');
            Route::get('/create', [TypeAppartementController::class, 'create'])->name('appartements.types.create');
            Route::post('/store', [TypeAppartementController::class, 'store'])->name('appartements.types.store');
            Route::patch('/{typeAppartement}', [TypeAppartementController::class, 'update'])->name('appartements.types.update');
            Route::delete('/{typeAppartement}', [TypeAppartementController::class, 'destroy'])->name('appartements.types.delete');
            Route::patch('/{typeAppartement}/status', [TypeAppartementController::class, 'status'])->name('appartements.types.status');
        });
    });
});
