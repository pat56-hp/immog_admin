<?php

use App\Http\Controllers\Utilisateurs\ProprietaireController;
use Illuminate\Support\Facades\Route;

Route::controller(ProprietaireController::class)->group(function () {
    Route::group(['prefix' => 'proprietaires', 'as' => 'proprietaires.'], function () {
        Route::get('/create', 'create')->name('create');
        Route::get('/', 'index')->name('index');
        Route::post('/store', 'store')->name('store');
        Route::patch('/update/{proprietaire}', 'update')->name('update');
        Route::delete('/destroy/{proprietaire}', 'destroy')->name('destroy');
        Route::patch('status/{proprietaire}', 'editStatus')->name('status');
    });
});
