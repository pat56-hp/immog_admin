<?php

namespace App\Http\Controllers;

use App\Services\ActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(private ActivityService $activityService)
    {
        Inertia::share([
            'title' => 'Tableau de bord', 
            'menu' => 'dashboard', 
            'submenu' => ''
        ]);    
    }

    public function dashboard(){
        $this->activityService->save('Ouverture du tableaux de bord');
        return Inertia::render('dashboard');
    }
}
