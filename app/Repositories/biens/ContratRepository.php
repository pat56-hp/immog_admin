<?php

namespace App\Repositories\biens;

use App\Models\Contrat;
use App\Repositories\Interfaces\biens\ContratInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class ContratRepository implements ContratInterface
{

    public function __construct(private Contrat $model) {}

    /**
     * Recuperation de la liste des contrats de bail
     *
     * @return Collection
     */
    public function get(): Collection
    {
        return $this->model->latest()->get();
    }

    /**
     * Enregistrement des informations du contrat de bail
     *
     * @param array $data
     * @return Contrat
     */
    public function save(array $data): Contrat
    {
        if (isset($data['id'])) {
            $contrat = $this->model->findOrFail($data['id']);
            $contrat->update($data);
            return $contrat;
        }

        //Generation de la reference du contrat
        $data['ref'] = Str::random(8);
        return $this->model->create($data);
    }

    /**
     * Suppression d'un contrat de bail
     *
     * @param Contrat $contrat
     * @return boolean
     */
    public function destroy(Contrat $contrat): bool
    {
        return $contrat->delete();
    }

    /**
     * Update du statut d'un contrat
     *
     * @param string $status
     * @param Contrat $contrat
     * @return Contrat
     */
    public function status(string $status, Contrat $contrat): Contrat
    {
        $contrat->update(['statut' => $status]);
        return $contrat;
    }
}
