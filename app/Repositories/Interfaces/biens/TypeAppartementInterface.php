<?php

namespace App\Repositories\Interfaces\biens;

use App\Models\TypeAppartement;
use Illuminate\Database\Eloquent\Collection;

interface TypeAppartementInterface
{
    /**
     * Récupérer tous les types d'appartement
     */
    public function get(): Collection;

    /**
     * Enregistrer un type d'appartement
     */
    public function save(array $data): TypeAppartement;

    /**
     * Mettre à jour le statut d'un type d'appartement
     */
    public function status(TypeAppartement $type): TypeAppartement;

    /**
     * Supprimer un type d'appartement
     */
    public function destroy(TypeAppartement $type): bool;
}
