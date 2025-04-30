<?php

namespace App\Repositories\Interfaces\utilisateurs;

use App\Models\Proprietaire;

interface ProprietaireInterface{
    public function get(): mixed;
    public function findById(string $id): ?Proprietaire;
    public function save(array $data): mixed;
    public function destroy(Proprietaire $proprietaire): void;
    public function status(Proprietaire $proprietaire): void;
}