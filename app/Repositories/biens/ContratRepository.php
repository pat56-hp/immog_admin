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
        } else
            $contrat = $this->model->create($data);


        //On verifie le statut du contrat pour mettre à jour la disponibilité de l'appartement
        if ($contrat->statut === 'en cours') {
            $contrat->appartement->update(['statut' => 'occupé']);
        } else {
            $contrat->appartement->update(['statut' => 'disponible']);
        }

        return $contrat;
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
