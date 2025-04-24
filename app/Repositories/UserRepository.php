<?php

namespace App\Repositories;

use App\Repositories\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserInterface{


    public function __construct(public User $user){}

    public function findById(string $id): ?User{
        return $this->user->findOrFail($id);
    }

    public function get(){
        return $this->user->latest()->get();
    }

    public function save(array $data): mixed{
        return $this->user->updateOrCreate(['id' => $data['id']], [
            'name' => $data['name'],
            'email' => $data['email'],
            'status' => $data['status'] ?? 0,
            'phone' => $data['phone'],
            'role_id' => $data['role'],
            'password' => $data['password'],
            'created_by' => $data['created_by']
        ]);
    }

    public function destroy(User $user): void{
        $user->delete();
    }

    public function status(User $user): void{
        $user->update([
            'status' => $user->status == 0 ? 1 : 0
        ]);
    }
}