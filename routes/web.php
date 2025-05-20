<?php

use App\Http\Controllers\Configurations\ActivityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::middleware('auth')->group(function () {
    //Dashboard Route
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    //Profile Routes
    Route::controller(ProfileController::class)->group(function () {
        Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {
            Route::get('/', 'edit')->name('edit');
            Route::patch('/', 'update')->name('update');
            Route::delete('/', 'destroy')->name('destroy');
            Route::get('/update-password', 'password')->name('password');
            Route::put('/update-password', 'passwordUpdate');
        });
    });

    //Activity Routes
    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');

    require __DIR__ . '/role.php';
    require __DIR__ . '/user.php';
    require __DIR__ . '/setting.php';
    require __DIR__ . '/proprietaire.php';
    require __DIR__ . '/locataire.php';
    require __DIR__ . '/appartement.php';
    require __DIR__ . '/contrat.php';
});

require __DIR__ . '/auth.php';
