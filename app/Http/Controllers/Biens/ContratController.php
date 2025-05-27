<?php

namespace App\Http\Controllers\Biens;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContratRequest;
use App\Models\Contrat;
use App\Repositories\Interfaces\biens\ContratInterface;
use App\Repositories\Interfaces\utilisateurs\LocataireInterface;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Services\ActivityService;
use App\Services\MailService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContratController extends Controller
{
    public function __construct(
        private ActivityService $activityService,
        private ContratInterface $contratRepository,
        private ProprietaireInterface $proprietaireRepository,
        private LocataireInterface $locataireRepository,
        private MailService $mailService
    ) {
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

    /**
     * Creation d'un contrat de bail
     *
     * @return void
     */
    public function create()
    {
        $this->activityService->save('Affichage du formulaire de génération d\'un contrat de bail');
        return Inertia::render('biens/contrats/create', [
            'proprietaires' => $this->proprietaireRepository->get(['status' => 1]),
            'locataires' => $this->locataireRepository->get(['status' => 1]),
            'title' => 'Génération de contrat'
        ]);
    }

    /**
     * Sauvegarde des infos du contrat
     *
     * @param ContratRequest $request
     * @return void
     */
    public function store(ContratRequest $request)
    {
        $data = $request->validated();

        try {
            //Sauvegarde des informations
            $contrat = $this->contratRepository->save($data);

            //Envoie du contrat aux deux parties si la condition est cochée
            !$request->mail_send ?: $this->mailService->sendContratToPart($contrat);

            //Log activity
            $this->activityService->save('Création du contrat ' . $contrat->ref);

            return to_route('contrats.index')->with('success', 'Contrat sauvegardé avec succès');
        } catch (\Throwable $th) {
            logger()->error('Une erreur est survenue lors de la sauvegarde du contrat', [$th->getMessage()]);
            return back()->withErrors(['error' => 'Une erreur est survenue lors de la sauvegarde du contrat : ' . $th->getMessage()]);
        }
    }

    public function update(ContratRequest $request) {}

    public function destroy(Contrat $contrat) {}

    public function status(Request $request, Contrat $contrat) {}

    /**
     * Téléchargement du contrat
     * 
     * @param Contrat $contrat
     * @return void
     */
    public function download(Contrat $contrat)
    {
        $pdf = PDF::loadHTML("{$contrat->description}");
        $contrat_name = "contrat_{$contrat->ref}.pdf";
        return $pdf->download($contrat_name);
    }
}
