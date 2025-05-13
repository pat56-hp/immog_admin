<?php

namespace App\Http\Controllers\Appartements;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppartementRequest;
use App\Models\Appartement;
use App\Repositories\Interfaces\biens\AppartementInterface;
use App\Repositories\Interfaces\biens\TypeAppartementInterface;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Services\ActivityService;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppartementController extends Controller
{
    public function __construct(private AppartementInterface $appartementRepository, private ActivityService $activityService, private TypeAppartementInterface $typeAppartementRepository, private ProprietaireInterface $proprietaireRepository, private CloudinaryService $cloudinaryService,)
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

    /**
     * Sauvegarde d'un appartement
     *
     * @param AppartementRequest $request
     * @return void
     */
    public function store(AppartementRequest $request)
    {
        $data = $request->validated();

        try {
            //Sauvegarde des photos sur cloudinary
            if (!empty($request->photos)) {
                $photos = [];
                foreach ($request->photos as $photo) {
                    $photos[] = $this->cloudinaryService->upload($photo, 'appartements/photos');
                }
                $data['photos'] = count($photos) > 0 ? json_encode($photos) : null;
            }

            //Sauvegarde de l'appartement
            $appartement = $this->appartementRepository->save($data);
            $this->activityService->save('Création de l\'appartement ' . $appartement->libelle);
            return to_route('appartements.index')->with('success', 'Appartement enregistré avec succès');
        } catch (\Throwable $th) {
            logger()->error('Une erreur est survenue lors de la création de l\'appartement', [$th->getMessage()]);
            return back()->withErrors(['error' => 'Une erreur est survenue lors de la création de l\'appartement : ' . $th->getMessage()]);
        }
    }

    /**
     * Modification d'un appartement
     *
     * @param Appartement $appartement
     * @return void
     */
    public function edit(Appartement $appartement)
    {
        $data['appartement'] = $appartement;
        $data['title'] = 'Modification de l\'appartement ' . $appartement->libelle;
        $data['types'] = $this->typeAppartementRepository->get();
        $data['proprietaires'] = $this->proprietaireRepository->get();
        $this->activityService->save('Affichage du formulaire de modification de l\'appartement ' . $appartement->libelle);
        return Inertia::render('biens/appartements/edit', $data);
    }

    public function update(AppartementRequest $request, Appartement $appartement)
    {
        $data = $request->validated();

        try {
            $data['id'] = $appartement->id;

            //Sauvegarde des photos sur cloudinary
            if (!empty($request->photos)) {
                //Suppression des photos existantes
                if (!empty($appartement->photos)) {
                    $photos = json_decode($appartement->photos, true);
                    foreach ($photos as $photo) {
                        $this->cloudinaryService->delete($photo);
                    }
                }

                //Ajout des nouvelles photos
                $photos = [];
                foreach ($request->photos as $photo) {
                    $photos[] = $this->cloudinaryService->upload($photo, 'appartements/photos');
                }
                $data['photos'] = count($photos) > 0 ? json_encode($photos) : null;
            }

            //Sauvegarde de l'appartement
            $appartement = $this->appartementRepository->save($data);
            $this->activityService->save('Modification de l\'appartement ' . $appartement->libelle);
            return to_route('appartements.index')->with('success', 'Appartement modifié avec succès');
        } catch (\Throwable $th) {
            logger()->error('Une erreur est survenue lors de la modification de l\'appartement', [$th->getMessage()]);
            return back()->withErrors(['error' => 'Une erreur est survenue lors de la création de l\'appartement : ' . $th->getMessage()]);
        }
    }

    public function destroy() {}

    public function status() {}
}
