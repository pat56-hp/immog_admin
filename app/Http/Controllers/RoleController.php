<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('configurations/roles/index', [
            'title' => 'Liste des rôles',
            'roles' => Role::withCount('users')->get()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return Inertia::render('configurations/roles/show', [
            'title' => 'Rôle ' . $role->libelle,
            'role' => $role->load('users')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validate = $request->validate([
            'libelle' => 'required|string|max:20',
            'status' => 'required|integer',
        ]);

        $role->update($validate);

        return back();
    }

    /**
     * Edit status
     */
    public function editStatus(Role $role)
    {
        $role->update([
            'status' => $role->status == 1 ? 0 : 1
        ]);

        return back();
    }
}
