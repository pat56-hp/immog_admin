<?php

namespace App\Http\Controllers\Biens;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContratRequest;
use App\Models\Contrat;
use App\Repositories\Interfaces\biens\ContratInterface;
use App\Repositories\Interfaces\comptabilites\FactureInterface;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Repositories\utilisateurs\LocataireRepository;
use App\Services\ActivityService;
use App\Services\MailService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContratController extends Controller
{
    public function __construct(
        private ActivityService $activityService,
        private ContratInterface $contratRepository,
        private FactureInterface $factureRepository,
        private ProprietaireInterface $proprietaireRepository,
        private LocataireRepository $locataireRepository,
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

        DB::beginTransaction();

        try {
            //Sauvegarde des informations du contrat
            $contrat = $this->contratRepository->save($data);

            //Génération de la facture du contrat
            $factureData['type'] = 'contrat';
            $factureData['type_id'] = $contrat->id;
            $factureData['montant'] = $contrat->garantie * $contrat->appartement->loyer;
            $factureData['user_type'] = 'locataire';
            $factureData['user_id'] = $contrat->locataire_id;
            $factureData['statut'] = 'impayé';
            $factureData['etat'] = 'validé';
            $factureData['date_emission'] = now();
            $factureData['date_echeance'] = now()->addDays(30); //30 jours après la date d'émission
            $factureData['elements'][] = [
                'libelle' => 'Contrat de ' . $contrat->type . ', ' . $contrat->garantie . ' mois de garantie',
                'montant' => $contrat->garantie * $contrat->appartement->loyer
            ];

            $facture = $this->factureRepository->save($factureData);

            //Envoie du contrat aux deux parties si la condition est cochée
            !$request->mail_send ?: $this->mailService->sendContratToPart($contrat);

            //Envoie de la facture au locataire par email
            $this->mailService->sendFactureToLocataire($facture);

            //Log activity
            $this->activityService->save('Création du contrat ' . $contrat->ref . ' et génération de la facture ' . $facture->ref);

            DB::commit();
            return to_route('contrats.index')->with('success', 'Contrat sauvegardé avec succès');
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Une erreur est survenue lors de la sauvegarde du contrat', [$th->getMessage()]);
            return back()->with(['error' => 'Une erreur est survenue lors de la sauvegarde du contrat : ' . $th->getMessage()]);
        }
    }

    /**
     * Edition d'un contrat
     * 
     * @param Contrat $contrat
     * @return void
     */
    public function edit(Contrat $contrat)
    {
        $this->activityService->save('Affichage du formulaire d\'édition du contrat ' . $contrat->ref);
        return Inertia::render('biens/contrats/edit', [
            'proprietaires' => $this->proprietaireRepository->get(['status' => 1]),
            'locataires' => $this->locataireRepository->get(['status' => 1]),
            'contrat' => $contrat,
            'title' => 'Édition du contrat' . $contrat->ref
        ]);
    }

    /**
     * Sauvegarde des modifications d'un contrat
     *
     * @param ContratRequest $request
     * @param Contrat $contrat
     * @return void
     */
    public function update(ContratRequest $request, Contrat $contrat)
    {
        $data = $request->validated();
        $data['id'] = $contrat->id;

        try {
            //Suavegarde des modifications
            $contrat = $this->contratRepository->save($data);

            //Log Activity
            $this->activityService->save('Modification du contrat ' . $contrat->ref);

            return to_route('contrats.index')->with('success', 'Les modifications ont été appliquées');
        } catch (\Throwable $th) {
            logger()->error('Une erreur est survenue lors de la modification du contrat', [$th->getMessage()]);
            return back()->with(['error' => 'Une erreur est survenue lors de la modification du contrat : ' . $th->getMessage()]);
        }
    }

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
