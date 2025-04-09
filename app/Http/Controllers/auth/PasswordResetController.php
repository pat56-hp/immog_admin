<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasswordResetController extends Controller
{
    public function __construct(){
        Inertia::share('title', 'Mot de passe oublié');
    }

    public function index(){
        return Inertia::render('auth/forgot-password');
    }
}
