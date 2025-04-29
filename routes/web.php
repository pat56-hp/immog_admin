<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    return redirect('/dashboard');
});

Route::middleware('auth')->group(function () {
    //Dashboard Route
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    
    //Profile Routes
    Route::controller(ProfileController::class)->group(function (){
        Route::group(['prefix' => 'profile', 'as' => 'profile.'], function (){
            Route::get('/', 'index')->name('index');
            Route::patch('/', 'update')->name('edit');
            Route::delete('/', 'destroy')->name('destroy');
            Route::get('/update-password', 'password')->name('password');
            Route::put('/update-password', 'passwordUpdate');
        });
    });
    
    //Activity Routes
    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
    


    require __DIR__.'/role.php';
    require __DIR__.'/user.php';
    require __DIR__.'/setting.php';
});

require __DIR__.'/auth.php';

