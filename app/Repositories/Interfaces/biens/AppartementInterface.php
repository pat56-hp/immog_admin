<?php

namespace App\Repositories\Interfaces\biens;

interface AppartementInterface
{
    /**
     * Récupérer tous les appartements
     */
    public function get();

    /**
     * Récupérer un appartement par son ID
     */
    public function find(int $id);

    /**
     * Enregistrer un appartement
     */
    public function save(array $data);

    /**
     * Mettre à jour le statut d'un appartement
     */
    public function status(int $id);

    /**
     * Supprimer un appartement
     */
    public function destroy(int $id);
} 