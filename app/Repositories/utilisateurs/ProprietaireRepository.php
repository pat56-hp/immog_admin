<?php

namespace App\Repositories\utilisateurs;

use App\Models\Proprietaire;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;

class ProprietaireRepository implements ProprietaireInterface
{

    public function __construct(private Proprietaire $proprietaire) {}

    public function get(): mixed
    {
        return $this->proprietaire->latest()->get();
    }

    public function findById(string $id): ?Proprietaire
    {
        return $this->proprietaire->findOrFail($id);
    }

    public function save(array $data): mixed
    {
        return $this->proprietaire->updateOrCreate(['id' => $data['id'] ?? 0], $data);
    }

    public function destroy(Proprietaire $proprietaire): void
    {
        $proprietaire->delete();
    }

    public function status(Proprietaire $proprietaire): void
    {
        $proprietaire->status = !$proprietaire->status;
        $proprietaire->save();
    }
}
