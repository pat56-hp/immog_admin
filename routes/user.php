<?php

use App\Http\Controllers\Configurations\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)->group(function(){
    Route::group(['prefix' => 'configurations/users', 'as' => 'users.'], function(){
        Route::get('/', 'index')->name('index');
        Route::post('/store', 'save')->name('store');
        Route::patch('/update/{user}', 'save')->name('update');
        Route::put('/status/{user}', 'editStatus')->name('status');
        Route::delete('/destroy/{user}', 'destroy')->name('delete');
    });
});