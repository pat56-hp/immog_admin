<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppartementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'libelle' => $this->libelle,
            'adresse' => $this->adresse_name,
            'loyer' => $this->loyer_formatted,
            'supercifie' => $this->superficie_formatted,
            'charge' => $this->charges_formatted,
            'nombre_de_piece' => $this->nombre_pieces,

        ];
    }
}
