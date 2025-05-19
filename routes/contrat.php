<?php

use App\Http\Controllers\Biens\ContratController;
use Illuminate\Support\Facades\Route;

Route::resource('contrats', ContratController::class);
