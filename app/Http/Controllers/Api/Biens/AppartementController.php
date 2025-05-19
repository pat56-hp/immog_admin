<?php

namespace App\Http\Controllers\Api\Biens;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppartementResource;
use App\Models\Proprietaire;
use App\Repositories\Interfaces\biens\AppartementInterface;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class AppartementController extends Controller
{
    public function __construct(private AppartementInterface $appartementRepository) {}

    /**
     * Recuperation des appartements d'un proprietaire
     *
     * @param Request $request
     * @return void
     */
    public function getByProprio(Proprietaire $proprietaire)
    {
        return response()->json([
            'data' => AppartementResource::collection($proprietaire->appartements()->where(['statut' => 'disponible'])->get()),
            'message' => 'Liste des appartement du proprietaire sélectionné'
        ], JsonResponse::HTTP_ACCEPTED);
    }
}
