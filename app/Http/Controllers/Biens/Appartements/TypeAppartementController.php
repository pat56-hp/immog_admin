<?php

namespace App\Http\Controllers\Biens\Appartements;

use App\Http\Controllers\Controller;
use App\Models\TypeAppartement;
use App\Repositories\Interfaces\biens\TypeAppartementInterface;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeAppartementController extends Controller
{
    public function __construct(
        private TypeAppartementInterface $typeAppartementRepository,
        private ActivityService $activityService,
    ) {
        Inertia::share(['module' => 'Appartements']);
    }

    /**
     * Récupération des types d'appartement
     */
    public function index()
    {
        $this->activityService->save('Ouverture de la liste des types d\'appartements');
        return Inertia::render('biens/types/index', [
            'types' => $this->typeAppartementRepository->get(),
            'title' => 'Types d\'appartement',
        ]);
    }

    /**
     * Création d'un type d'appartement
     */
    public function create()
    {
        $this->activityService->save('Création d\'un nouveau type d\'appartement');
        return Inertia::render('biens/types/create', [
            'title' => 'Nouveau type d\'appartement',
        ]);
    }

    /**
     * Enregistrement d'un nouveau type d'appartement
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'libelle' => ['required', 'string', 'max:255', 'unique:type_appartements,libelle'],
            'description' => 'nullable',
            'status' => 'nullable|integer'
        ]);

        try {
            $type = $this->typeAppartementRepository->save($data);
            $this->activityService->save('Ajout d\'un nouveau type d\'appartement : ' . $type->libelle);

            session()->flash('success', 'Type d\'appartement ajouté avec succès');
            return to_route('appartements.types.index');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de l\'ajout d\'un type d\'appartement : ' . $th->getMessage());
            return back()->with('error', 'Une erreur s\'est produite : ' . $th->getMessage());
        }
    }

    /**
     * Mise à jour d'un type d'appartement
     */
    public function update(Request $request, TypeAppartement $typeAppartement)
    {
        $data = $request->validate([
            'libelle' => 'required|string|max:255|unique:type_appartements,libelle,' . $typeAppartement->id,
            'description' => 'nullable',
            'status' => 'nullable|integer'
        ]);

        $data['id'] = $typeAppartement->id;

        try {

            $type = $this->typeAppartementRepository->save($data);
            $this->activityService->save('Modification des informations du type d\'appartement : ' . $type->libelle);

            session()->flash('success', 'Type d\'appartement modifié avec succès');
            return to_route('appartements.types.index');
        } catch (\Throwable $th) {
            return back()->with('error', 'Une erreur s\'est produite : ' . $th->getMessage());
        }
    }

    /**
     * Modification du statut d'un type d'appartement
     */
    public function editStatus(TypeAppartement $typeAppartement)
    {
        try {
            $this->typeAppartementRepository->status($typeAppartement);
            $this->activityService->save(
                'Edition du statut du type d\'appartement : ' . $typeAppartement->libelle . ' à ' .
                    ($typeAppartement->status ? 'Actif' : 'Inactif')
            );
            return back()->with('success', 'Mise à jour effectuée !');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de la modification du statut du type d\'appartement : ' . $typeAppartement->libelle . ' : ' . $th->getMessage());
            return back()->with('error', 'Une erreur est survenue : ' . $th->getMessage());
        }
    }

    /**
     * Suppression d'un type d'appartement
     */
    public function destroy(TypeAppartement $typeAppartement)
    {
        try {
            $this->typeAppartementRepository->destroy($typeAppartement);
            $this->activityService->save('Suppression du type d\'appartement : ' . $typeAppartement->libelle);
            return back()->with('success', 'Type d\'appartement supprimé avec succès');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    /**
     * Modification du statut du type d'appartement
     */
    public function status(TypeAppartement $typeAppartement)
    {
        try {
            $this->typeAppartementRepository->status($typeAppartement);
            $this->activityService->save(
                'Edition du statut du type : ' . $typeAppartement->libelle . ' à ' .
                    ($typeAppartement->statusName)
            );
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de la modification du statut du type : ' . $typeAppartement->libelle . ' : ' . $th->getMessage());
            return back()->with('error', 'Une erreur est survenue : ' . $th->getMessage());
        }
    }
}
