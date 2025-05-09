<?php

namespace App\Http\Controllers\Utilisateurs;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocataireRequest;
use App\Models\Locataire;
use App\Repositories\Interfaces\utilisateurs\LocataireInterface;
use App\Services\ActivityService;
use App\Services\CloudinaryService;
use Inertia\Inertia;

class LocataireController extends Controller
{
    public function __construct(
        private LocataireInterface $locataireRepository,
        private ActivityService $activityService,
        private CloudinaryService $cloudinaryService
    ) {
        Inertia::share(['module' => 'Locataires']);
    }

    /**
     * Récupération des locataires
     */
    public function index()
    {
        $this->activityService->save('Ouverture de la liste des locataires');
        return Inertia::render('users/locataires/index', [
            'locataires' => $this->locataireRepository->get(),
            'title' => 'Liste des locataires',
        ]);
    }

    /**
     * Création d'un nouveau locataire
     */
    public function create()
    {
        $this->activityService->save('Création d\'un nouveau locataire');
        return Inertia::render('users/locataires/create', [
            'title' => 'Nouveau locataire',
        ]);
    }

    /**
     * Enregistrement d'un nouveau locataire
     */
    public function store(LocataireRequest $request)
    {
        $data = $request->validated();

        try {
            if ($request->hasFile('picture')) {
                $data['picture'] = $this->cloudinaryService->upload($request->validated(['picture']), 'locataires/pictures');
            }

            if ($request->justificatif_identite) {
                $files = [];
                foreach ($request->justificatif_identite as $item) {
                    $files[] = $this->cloudinaryService->upload($item, 'locataires/documents');
                }
                $data['justificatif_identite'] = json_encode($files);
            }

            $locataire = $this->locataireRepository->save($data);
            $this->activityService->save('Ajout d\'un nouveau locataire : ' . $locataire->nom_complet);

            session()->flash('success', 'Locataire ajouté avec succès');
            return to_route('locataires.index');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de l\'ajout d\'un nouveau locataire : ' . $th->getMessage());
            return back()->with('error', 'Une erreur s\'est produite : ' . $th->getMessage());
        }
    }

    /**
     * Édition d'un locataire
     */
    public function edit(Locataire $locataire)
    {
        $this->activityService->save('Edition du locataire : ' . $locataire->nom_complet);
        return Inertia::render('users/locataires/edit', [
            'title' => 'Modification d\'un locataire',
            'locataire' => $locataire
        ]);
    }

    /**
     * Mise à jour d'un locataire
     */
    public function update(LocataireRequest $request, Locataire $locataire)
    {
        $data = $request->validated();
        $data['id'] = $locataire->id;

        if ($request->hasFile('picture')) {
            $data['picture'] = storeFile(
                \Str::slug($data['nom'] . '-locataire'),
                'uploads/locataires',
                $request->file('picture')
            );
        } else {
            $data['picture'] = $locataire->picture;
        }

        if ($request->hasFile('justificatif_identite')) {
            $data['justificatif_identite'] = storeFile(
                \Str::slug($data['nom'] . '-justificatif'),
                'uploads/justificatifs',
                $request->file('justificatif_identite')
            );
        } else {
            $data['justificatif_identite'] = $locataire->justificatif_identite;
        }

        try {
            $locataire = $this->locataireRepository->save($data);
            $this->activityService->save('Modification des informations du locataire : ' . $locataire->nom_complet);

            session()->flash('success', 'Locataire modifié avec succès');
            return to_route('locataires.index');
        } catch (\Throwable $th) {
            return back()->with('error', 'Une erreur s\'est produite : ' . $th->getMessage());
        }
    }

    /**
     * Modification du statut d'un locataire
     */
    public function editStatus(Locataire $locataire)
    {
        try {
            $this->locataireRepository->status($locataire);
            $this->activityService->save(
                'Edition du statut du locataire : ' . $locataire->nom_complet . ' à ' .
                    ($locataire->status ? 'Actif' : 'Inactif')
            );
            return back()->with('success', 'Mise à jour effectuée !');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de la modification du statut du locataire : ' . $locataire->nom_complet . ' : ' . $th->getMessage());
            return back()->with('error', 'Une erreur est survenue : ' . $th->getMessage());
        }
    }

    /**
     * Suppression d'un locataire
     */
    public function destroy(Locataire $locataire)
    {
        try {
            $this->locataireRepository->destroy($locataire);
            $this->activityService->save('Suppression du locataire : ' . $locataire->nom_complet);
            return back()->with('success', 'Locataire supprimé avec succès');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }
}
