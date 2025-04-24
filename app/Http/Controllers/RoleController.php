<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function __construct(private ActivityService $activityService){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Activity Log
        $this->activityService->save('Ouverture de la liste des rôles');

        return Inertia::render('configurations/roles/index', [
            'title' => 'Liste des rôles',
            'roles' => Role::withCount('users')->get()
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validate = $request->validate([
            'libelle' => 'required|string|max:20',
            'status' => 'required',
        ]);

        $role->update($validate);

        //Activity Log
        $this->activityService->save('Modification du rôle ' . $role->libelle);

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

        //Activity Log
        $this->activityService->save('Edition du statut du rôle '. $role->libelle. ' à '. ($role->status == 1? 'Actif' : 'Inactif'));

        return back();
    }
}
