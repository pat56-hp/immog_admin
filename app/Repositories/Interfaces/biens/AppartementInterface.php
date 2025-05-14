<?php

namespace App\Repositories\Interfaces\biens;

use App\Models\Appartement;
use Illuminate\Database\Eloquent\Collection;

interface AppartementInterface
{
    /**
     * Récupérer tous les appartements
     */
    public function get(): Collection;

    /**
     * Enregistrer un appartement
     */
    public function save(array $data): Appartement;

    /**
     * Supprimer un appartement
     */
    public function destroy(Appartement $appartement): bool;
}
