<?php

namespace App\Http\Controllers\Utilisateurs;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProprietaireRequest;
use App\Models\Proprietaire;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Services\ActivityService;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProprietaireController extends Controller
{
    public function __construct(
        private ProprietaireInterface $proprietaireRepository,
        private ActivityService $activityService,
        private CloudinaryService $cloudinaryService
    ) {
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


        try {
            if ($request->hasFile('picture')) $data['picture'] = $this->cloudinaryService->upload($request->validated('picture'), 'proprietaires/pictures');
            $proprietaire = $this->proprietaireRepository->save($data);
            $this->activityService->save('Ajout d\'un nouveau propriétaire : ' . ucwords($proprietaire->nom));

            session()->flash('success', 'Propriétaire ajouté avec succès');
            return to_route('proprietaires.index');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de l\'ajout d\'un nouveau propriétaire : ' . $th->getMessage());
            return back()->with('error', 'Une erreur s\'est produite : ' . $th->getMessage());
        }
    }

    public function edit(Proprietaire $proprietaire)
    {
        $this->activityService->save('Edition du propriétaire : ' . $proprietaire->name);
        return Inertia::render('users/proprietaires/edit', [
            'title' => 'Modification d\'un propriétaire',
            'proprietaire' => $proprietaire
        ]);
    }

    /**
     * Modification d'un propriétaire
     *
     * @param ProprietaireRequest $request
     * @param Proprietaire $proprietaire
     * @return void
     */
    public function update(ProprietaireRequest $request, Proprietaire $proprietaire)
    {
        $data = $request->validated();
        $data['id'] = $proprietaire->id;

        //Mise à jour des information
        try {
            if ($request->hasFile('picture')) {
                if ($proprietaire->picture != null) {
                    $this->cloudinaryService->delete($proprietaire->picture);
                }

                $data['picture'] = $this->cloudinaryService->upload($request->validated('picture'), 'proprietaires/pictures');
            } else
                $data['picture'] = $proprietaire->picture;

            $proprietaire = $this->proprietaireRepository->save($data);
            $this->activityService->save('Modification des informations du propriétaire : ' . ucwords($proprietaire->nom));

            session()->flash('success', 'Propriétaire modifié avec succès');
            return to_route('proprietaires.index');
        } catch (\Throwable $th) {
            return back()->with('error', 'Une erreur s\'est produite : ' . $th->getMessage());
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
            if ($proprietaire->picture != null) {
                $this->cloudinaryService->delete($proprietaire->picture);
            }
            $this->activityService->save('Suppression du propriétaire : ' . $proprietaire->nom);
            return back()->with('success', 'Propriétaire supprimé avec succès');
        } catch (\Throwable $th) {
            //throw $th;
            return back()->withErrors($th->getMessage());
        }
    }
}
