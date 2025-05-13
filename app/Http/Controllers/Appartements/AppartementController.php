<?php

namespace App\Http\Controllers\Appartements;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\biens\AppartementInterface;
use App\Repositories\Interfaces\biens\TypeAppartementInterface;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppartementController extends Controller
{
    public function __construct(private AppartementInterface $appartementRepository, private ActivityService $activityService, private TypeAppartementInterface $typeAppartementRepository, private ProprietaireInterface $proprietaireRepository,)
    {
        Inertia::share([
            'module' => 'Appartements'
        ]);
    }

    /**
     * Récupération de la liste des apparements
     *
     * @return void
     */
    public function index()
    {
        $this->activityService->save('Affichage de la liste des apparements');
        return Inertia::render('biens/appartements/index', [
            'appartements' => $this->appartementRepository->get(),
            'title' => 'Liste des appartements'
        ]);
    }

    /**
     * Création d'un appartement
     *
     * @return void
     */
    public function create()
    {
        $this->activityService->save('Affichage du formulaire d\'ajout d\'un appartement');
        return Inertia::render('biens/appartements/create', [
            'title' => 'Ajout d\'un appartement',
            'types' => $this->typeAppartementRepository->get(),
            'proprietaires' => $this->proprietaireRepository->get(),
        ]);
    }

    public function store() {}

    public function edit() {}

    public function update() {}

    public function destroy() {}

    public function status() {}
}
