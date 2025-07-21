<?php

namespace App\Repositories\Interfaces;

interface ActivityInterface
{
    public function paginate();
    public function save(array $data);
}
