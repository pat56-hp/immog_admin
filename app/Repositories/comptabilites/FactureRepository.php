<?php

namespace App\Repositories\comptabilites;

use App\Models\Facture;
use App\Repositories\Interfaces\comptabilites\FactureInterface;
use Illuminate\Database\Eloquent\Collection;

class FactureRepository implements FactureInterface
{
    public function __construct(private Facture $model) {}

    /**
     * Recuperation de la liste des factures
     *
     * @return Collection
     */
    public function get(): Collection
    {
        return $this->model->latest()->get();
    }

    /**
     * Enregistrement des informations d'une facture
     *
     * @param array $data
     * @return Facture
     */
    public function save(array $data): Facture
    {
        return $this->model->create($data);
    }

    /**
     * Suppression d'une facture
     *
     * @param Facture $facture
     * @return boolean
     */
    public function destroy(Facture $facture): bool
    {
        return false;
    }
}
