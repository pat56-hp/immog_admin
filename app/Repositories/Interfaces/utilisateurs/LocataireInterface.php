<?php

namespace App\Repositories\Interfaces\utilisateurs;

use App\Models\Locataire;
use Illuminate\Database\Eloquent\Collection;

interface LocataireInterface
{
    /**
     * Récupérer tous les locataires
     *
     * @return Collection
     */
    public function get(): Collection;

    /**
     * Sauvegarder un locataire
     *
     * @param array $data
     * @return Locataire
     */
    public function save(array $data): Locataire;

    /**
     * Modifier le statut d'un locataire
     *
     * @param Locataire $locataire
     * @return Locataire
     */
    public function status(Locataire $locataire): Locataire;

    /**
     * Supprimer un locataire
     *
     * @param Locataire $locataire
     * @return bool
     */
    public function destroy(Locataire $locataire): bool;
}
