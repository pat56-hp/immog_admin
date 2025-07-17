<?php

namespace App\Repositories\comptabilites;

use App\Models\Facture;
use App\Repositories\Interfaces\comptabilites\FactureInterface;
use Illuminate\Contracts\Pagination\Paginator;
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
     * Recuperation de la liste sous forme paginée
     *
     * @param integer $perPage
     * @return Collection
     */
    public function paginate($request = null, $perPage =  10): Paginator
    {
        $query = $this->model->query();
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('ref', 'LIKE', "%$search%")
                    ->orWhere('montant', $search)
                    ->orWhere('date_emission', 'LIKE', "%$search%")
                    ->orWhere('date_echeance', 'LIKE', "%$search%")
                    ->orWhere('statut', 'LIKE', "%$search%")
                    ->orWhere('etat', 'LIKE', "%$search%")
                    ->orWhere('user_type', 'LIKE', "%$search%")
                    ->orWhereHas('typeUser', fn($q) => $q->where('name', 'LIKE', "%$search%"))
                    ->orWhereHas('typeModel', fn($q) => $q->where('ref', 'LIKE', "%$search%"));
            });
        }

        return $this->model->latest()->paginate($perPage)->appends(['search' => $request->search]);
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

        return $facture;
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
