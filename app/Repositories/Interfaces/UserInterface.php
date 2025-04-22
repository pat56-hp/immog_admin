<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserInterface{
    public function get();
    public function findById(string $id): ?User;
    public function save(array $data): mixed;
    public function destroy(User $user): void;
    public function status(User $user): void;
}