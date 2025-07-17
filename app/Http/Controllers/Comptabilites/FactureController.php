<?php

namespace App\Http\Controllers\Comptabilites;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\comptabilites\FactureInterface;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FactureController extends Controller
{
    public function __construct(private ActivityService $activityService, private FactureInterface $factureRepository)
    {
        Inertia::share([
            'module' => 'Facturations'
        ]);
    }

    public function index(Request $request)
    {
        $this->activityService->save('Affichage de la liste des factures');
        return Inertia::render('comptabilites/factures/index', [
            'title' => 'Liste des factures',
            'subtitle' => 'Affichage de la liste des factures',
            'factures' => $this->factureRepository->paginate($request, 1)
        ]);
    }
}
