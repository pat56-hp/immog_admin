<?php

namespace App\Repositories\biens;

use App\Models\TypeAppartement;
use App\Repositories\Interfaces\biens\TypeAppartementInterface;
use Illuminate\Database\Eloquent\Collection;

class TypeAppartementRepository implements TypeAppartementInterface
{
    public function __construct(private TypeAppartement $model) {}

    public function get(): Collection
    {
        return $this->model
            ->withCount('appartements')
            ->latest()
            ->get();
    }

    public function save(array $data): TypeAppartement
    {
        if (isset($data['id'])) {
            $type = $this->model->findOrFail($data['id']);
            $type->update($data);
            return $type;
        }

        return $this->model->create($data);
    }

    public function status(TypeAppartement $type): TypeAppartement
    {
        $type->update(['status' => !$type->status]);
        return $type;
    }

    public function destroy(TypeAppartement $type): bool
    {
        return $type->delete();
    }
}
