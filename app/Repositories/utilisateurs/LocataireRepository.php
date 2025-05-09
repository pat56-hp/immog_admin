<?php

namespace App\Repositories\utilisateurs;

use App\Models\Locataire;
use App\Repositories\Interfaces\utilisateurs\LocataireInterface;
use Illuminate\Database\Eloquent\Collection;

class LocataireRepository implements LocataireInterface
{
    public function __construct(private Locataire $model) {}

    public function get(): Collection
    {
        return $this->model->latest()->get();
    }

    public function save(array $data): Locataire
    {
        if (isset($data['id'])) {
            $locataire = $this->model->findOrFail($data['id']);
            $locataire->update($data);
            return $locataire;
        }

        return $this->model->create($data);
    }

    public function status(Locataire $locataire): Locataire
    {
        $locataire->update(['status' => !$locataire->status]);
        return $locataire;
    }

    public function destroy(Locataire $locataire): bool
    {
        return $locataire->delete();
    }
}
