<?php

namespace App\Repositories\Interfaces\comptabilites;

use App\Models\Facture;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Collection;

interface FactureInterface
{
    public function get(): Collection;
    public function paginate(): Paginator;

    public function save(array $data): Facture;

    public function destroy(Facture $facture): bool;
}
