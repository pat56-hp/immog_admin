<?php

namespace App\Http\Controllers\Api\Biens;

use App\Http\Controllers\Controller;
use App\Models\Appartement;
use App\Models\Contrat;
use App\Models\Locataire;
use App\Models\Proprietaire;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ContratController extends Controller
{
    /**
     * Envoie de promp à API Deepseek
     *
     * @param Request $request
     * @return void
     */
    /* public function __invoke(Request $request)
    {
        $request->validate([
            'proprietaire' => 'required|string',
            'appartement' => 'required|string',
            'locataire' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
        ]);

        try {
            $prompt = "Génère un contrat de bail pour un appartement avec les informations suivantes :
            - Propriétaire : {$request->proprietaire}
            - Appartement : {$request->appartement}
            - Locataire : {$request->locataire}
            - Durée du bail : du {$request->date_debut} au {$request->date_fin}
            
            Le contrat doit être formaté en HTML et inclure toutes les clauses standard d'un contrat de bail.";

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.deepseek.api_key'),
                'Content-Type' => 'application/json',
            ])->post(config('services.deepseek.api_url') . '/chat/completions', [
                'model' => 'deepseek-chat',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Vous êtes un expert en droit immobilier français, spécialisé dans la rédaction de contrats de bail. Votre tâche est de générer des contrats de bail professionnels et conformes à la législation française.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'stream' => false,
                'temperature' => 0.7,
                'max_tokens' => 4000
            ]);

            if (!$response->successful()) {
                $errorData = $response->json();
                $errorMessage = $errorData['error']['message'] ?? 'Erreur inconnue';

                if (str_contains($errorMessage, 'Insufficient Balance')) {
                    throw new \Exception('Votre compte Deepseek n\'a pas suffisamment de crédits. Veuillez recharger votre compte.');
                }

                throw new \Exception('Erreur lors de la génération du contrat: ' . $errorMessage);
            }

            $responseData = $response->json();
            return response()->json([
                'contenu' => $responseData['choices'][0]['message']['content']
            ], JsonResponse::HTTP_ACCEPTED);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'data' => $th->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    } */

    public function generateContrat(Request $request)
    {
        $request->validate([
            'locataire' => 'required|exists:locataires,id',
            'appartement' => 'required|exists:appartements,id',
            'proprietaire' => 'required|exists:proprietaires,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'garantie' => 'required|integer',
            'type' => 'required|string'
        ]);

        try {
            $locataire = Locataire::findOrFail($request->locataire);
            $appartement = Appartement::findOrFail($request->appartement);
            $proprietaire = Proprietaire::findOrFail($request->proprietaire);
            $date_debut = Carbon::parse($request->date_debut);
            $date_fin = Carbon::parse($request->date_fin);
            $type = $request->type;

            $html = view('contrats.modele', [
                'nom_proprietaire' => $proprietaire->name,
                'contact_proprietaire' => $proprietaire->phone ?? 'N/A',
                'email_proprietaire' => $proprietaire->email ?? 'N/A',
                'adresse_proprietaire' => $proprietaire->address ?? 'N/A',

                'nom_locataire' => $locataire->nom_complet,
                'contact_locataire' => $locataire->telephone ?? 'N/A',
                'email_locataire' => $locataire->email ?? 'N/A',
                'adresse_locataire' => $locataire->adresse ?? 'N/A',

                'adresse_appartement' => $appartement->adresse ?? 'N/A',
                'contrat_type' => $type,

                'duree' => $date_debut->diffInYears($date_fin),
                'date_debut' => $date_debut->format('d F Y'),
                'date_fin' => $date_fin->format('d F Y'),

                'garantie' => $request->garantie,
                'garantie_amount' => number_format($appartement->loyer, 0, '.', ' ') . ' FCFA',

                'loyer' => $appartement->loyer_formatted,
                'charges_formatted' => $appartement->charges_formatted,

                'contrat_adresse' => $proprietaire->address,
                'contrat_date' => now()->format('d/m/Y')
            ])->render();

            return response()->json([
                'data' => $html,
                'message' => 'Génération de contrat est un succès'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Telechargement du contrat en pdf
     *
     * @param Contrat $contrat
     * @return void
     */
    public function download(Contrat $contrat) {}
}
