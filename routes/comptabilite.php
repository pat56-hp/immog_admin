<?php

use App\Http\Controllers\Comptabilites\FactureController;
use Illuminate\Support\Facades\Route;

Route::resource('factures', FactureController::class)->only(['index']);
