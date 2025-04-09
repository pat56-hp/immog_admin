<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct()
    {
        Inertia::share([
            'title' => 'Tableau de bord', 
            'menu' => 'dashboard', 
            'submenu' => ''
        ]);    
    }

    public function dashboard(){
        return Inertia::render('dashboard');
    }
}
