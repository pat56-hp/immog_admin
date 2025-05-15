<?php

namespace App\Repositories\Interfaces\biens;

use App\Models\Contrat;
use Illuminate\Database\Eloquent\Collection;

interface ContratInterface
{
    /**
     * Récupérer tous les contrats d'appartement
     */
    public function get(): Collection;

    /**
     * Enregistrer un type d'appartement
     */
    public function save(array $data): Contrat;

    /**
     * Mettre à jour le statut d'un contrat de logement
     */
    public function status(string $status, Contrat $contrat): Contrat;

    /**
     * Supprimer un contrat de logement
     */
    public function destroy(Contrat $contrat): bool;
}
