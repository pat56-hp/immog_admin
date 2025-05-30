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
        if (isset($data['id'])) {
            $facture = $this->model->findOrFail($data['id']);
            //On supprime les anciens elements
            $facture->elements->delete();

            //Enregsitre les modifications
            $facture->update($data);
        } else
            $facture = $this->model->create($data);


        //On enregistre les elements rattachés
        foreach ($data['elements'] as $element) {
            $facture->elements()->create($element);
        }
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
