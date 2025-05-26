<?php

namespace App\Http\Controllers\Api\Biens;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\JsonResponse;

class ContratController extends Controller
{
    /**
     * Envoie de promp à API Deepseek
     *
     * @param Request $request
     * @return void
     */
    public function __invoke(Request $request)
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
    }
}
