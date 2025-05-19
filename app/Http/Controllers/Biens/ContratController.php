<?php

namespace App\Http\Controllers\Biens;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContratRequest;
use App\Models\Contrat;
use App\Repositories\Interfaces\biens\ContratInterface;
use App\Repositories\Interfaces\utilisateurs\LocataireInterface;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContratController extends Controller
{
    public function __construct(private ActivityService $activityService, private ContratInterface $contratRepository, private ProprietaireInterface $proprietaireRepository, private LocataireInterface $locataireRepository,)
    {
        Inertia::share([
            'module' => 'Contrats'
        ]);
    }

    /**
     * Recuperation des contrats
     * 
     * @return void
     */
    public function index()
    {
        $this->activityService->save('Affichage de la liste des contrats de location');
        return Inertia::render('biens/contrats/index', [
            'contrats' => $this->contratRepository->get(),
            'title' => 'Liste des contrats'
        ]);
    }

    public function create()
    {
        $this->activityService->save('Affichage du formulaire de génération d\'un contrat de bail');
        return Inertia::render('biens/contrats/create', [
            'proprietaires' => $this->proprietaireRepository->get(['status' => 1]),
            'locataires' => $this->locataireRepository->get(['status' => 1]),
            'title' => 'Génération de contrat'
        ]);
    }

    public function store(ContratRequest $request) {}

    public function update(ContratRequest $request) {}

    public function destroy(Contrat $contrat) {}

    public function status(Request $request, Contrat $contrat) {}
}
