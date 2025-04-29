<?php

use App\Http\Controllers\Configurations\RoleController;
use Illuminate\Support\Facades\Route;

Route::name('roles.')->group(function(){
    Route::prefix('configurations/roles')->group(function(){
        Route::controller(RoleController::class)->group(function(){
            Route::get('/', 'index')->name('index');
            Route::patch('/update/{role}', 'update')->name('update');
            Route::put('/status/{role}', 'editStatus')->name('status');
        });
    });
});