<?php

use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => 'configurations/settings', 'as' => 'settings.'], function(){
    Route::get('/', function(){
        return Inertia::render('configurations/settings/index', [
            'title' => 'Paramètre de l\'application',
        ]);
    })->name('index');
    
    Route::post('/store', SettingController::class)->name('store');
 });