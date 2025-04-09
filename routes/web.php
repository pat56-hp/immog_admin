<?php

use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\PasswordResetController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth/')->group(function(){
    Route::get('/login', [LoginController::class, 'login'])->name('login');
    Route::get('/password-reset', [PasswordResetController::class, 'index'])->name('password.reset');
});

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
