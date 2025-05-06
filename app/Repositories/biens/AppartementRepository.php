<?php

namespace App\Repositories\biens;

use App\Models\Appartement;
use App\Repositories\Interfaces\biens\AppartementInterface;
use Illuminate\Support\Facades\DB;

class AppartementRepository implements AppartementInterface
{
    public function __construct(private Appartement $appartement)
    {
    }

    public function get()
    {
        return $this->appartement
            ->with(['proprietaire', 'locataire', 'typeAppartement'])
            ->latest()
            ->get();
    }

    public function find(int $id)
    {
        return $this->appartement
            ->with(['proprietaire', 'locataire', 'typeAppartement'])
            ->findOrFail($id);
    }

    public function save(array $data)
    {
        try {
            DB::beginTransaction();

            if (isset($data['id'])) {
                $appartement = $this->appartement->findOrFail($data['id']);
                $appartement->update($data);
            } else {
                $appartement = $this->appartement->create($data);
            }

            DB::commit();
            return $appartement;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function status(int $id)
    {
        $appartement = $this->appartement->findOrFail($id);
        $appartement->update(['status' => !$appartement->status]);
        return $appartement;
    }

    public function destroy(int $id)
    {
        $appartement = $this->appartement->findOrFail($id);
        return $appartement->delete();
    }
} 