<?php

use App\Http\Controllers\Api\Biens\AppartementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'v1'], function () {
    Route::get('/appartements/{proprietaire}', [AppartementController::class, 'getByProprio']);
});
