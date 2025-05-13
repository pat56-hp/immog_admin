<?php

namespace App\Repositories\biens;

use App\Models\Appartement;
use App\Repositories\Interfaces\biens\AppartementInterface;
use Illuminate\Database\Eloquent\Collection;

class AppartementRepository implements AppartementInterface
{
    public function __construct(private Appartement $model) {}

    public function get(): Collection
    {
        return $this->model
            ->latest()
            ->get();
    }

    public function save(array $data): Appartement
    {
        if (isset($data['id'])) {
            $appartement = $this->model->findOrFail($data['id']);
            $appartement->update($data);
        } else {
            $appartement = $this->model->create($data);
        }

        return $appartement;
    }

    public function status(Appartement $appartement): Appartement
    {
        $appartement->update(['status' => !$appartement->status]);
        return $appartement;
    }

    public function destroy(Appartement $appartement): bool
    {
        return $appartement->delete();
    }
}
