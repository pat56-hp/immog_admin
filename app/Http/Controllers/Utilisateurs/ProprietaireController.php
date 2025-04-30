<?php

namespace App\Http\Controllers\Utilisateurs;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProprietaireRequest;
use App\Models\Proprietaire;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProprietaireController extends Controller
{
    public function __construct(private ProprietaireInterface $proprietaireRepository, private ActivityService $activityService)
    {
        Inertia::share(['module' => 'Propriétaires']);
    }

    /**
     * Recuperation des propriétaires
     *
     * @return void
     */
    public function index()
    {
        //Activity Log
        $this->activityService->save('Ouverture de la liste des propriétaires');
        return Inertia::render('users/proprietaires/index', [
            'proprietaires' => $this->proprietaireRepository->get(),
            'title' => 'Liste des propriétaires',
        ]);
    }

    /**
     * Creation d'un nouveau propriétaire
     *
     * @return void
     */
    public function create()
    {
        $this->activityService->save('Création d\'un nouveau propriétaire');
        return Inertia::render('users/proprietaires/create', [
            'title' => 'Nouveau propriétaire',
        ]);
    }

    /**
     * Creation d'un nouveau propriétaire
     *
     * @param ProprietaireRequest $request
     * @return void
     */
    public function store(ProprietaireRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('picture'))
            $data['picture'] = storeFile(\Str::slug($data['nom'] . '-proprio'), 'uploads/proprietaires', $request->file('picture'));

        try {
            $proprietaire = $this->proprietaireRepository->save($data);
            $this->activityService->store('Ajout d\'un nouveau propriétaire : ' . ucwords($proprietaire->nom));

            return back()->with('success', 'Propriétaire ajouté avec succès');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    /**
     * Modification d'un propriétaire
     *
     * @param ProprietaireRequest $request
     * @param [type] $proprietaire
     * @return void
     */
    public function update(ProprietaireRequest $request, $proprietaire)
    {
        $data = $request->validated();
        $data['id'] = $proprietaire->id;

        if ($request->hasFile('picture'))
            $data['picture'] = storeFile(\Str::slug($data['nom'] . '-proprio'), 'uploads/proprietaires', $request->file('picture'));

        try {
            $proprietaire = $this->proprietaireRepository->save($data);
            $this->activityService->store('Modification des informations du propriétaire : ' . ucwords($proprietaire->nom));

            return back()->with('success', 'Propriétaire modifié avec succès');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    /**
     * Edition du statut d'un propriétaire
     *
     * @param Proprietaire $proprietaire
     * @return void
     */
    public function editStatus(Proprietaire $proprietaire)
    {
        try {
            $this->proprietaireRepository->status($proprietaire);
            //Activity Log
            $this->activityService->save('Edition du statut du propriétaire : ' . $proprietaire->nom . ' à ' . ($proprietaire->status == 1 ? 'Actif' : 'Inactif'));
            return back()->with('success', 'Mise à jour effectuée !');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de la modification du statut du propriétaire : ' . $proprietaire->nom . ' : ' . $th->getMessage());
            return back()->with('error', 'Une erreur est survenue : ' . $th->getMessage());
        }
    }

    /**
     * Suppression d'un propriétaire
     *
     * @param Proprietaire $proprietaire
     * @return void
     */
    public function destroy(Proprietaire $proprietaire)
    {
        try {
            $this->proprietaireRepository->destroy($proprietaire);
            $this->activityService->save('Suppression du propriétaire : ' . $proprietaire->nom);
            return back()->with('success', 'Propriétaire supprimé avec succès');
        } catch (\Throwable $th) {
            //throw $th;
            return back()->withErrors($th->getMessage());
        }
    }
}
