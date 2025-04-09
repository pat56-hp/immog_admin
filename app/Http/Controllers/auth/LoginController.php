<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function __construct()
    {
        Inertia::share(['title' => 'Se connecter']);
    }

    public function login(){
        return Inertia::render('auth/login');
    }
}
