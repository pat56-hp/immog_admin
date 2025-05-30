<?php

namespace App\Repositories\Interfaces\comptabilites;

use App\Models\Facture;
use Illuminate\Database\Eloquent\Collection;

interface FactureInterface
{
    public function get(): Collection;

    public function save(array $data): Facture;

    public function destroy(Facture $facture): bool;
}
