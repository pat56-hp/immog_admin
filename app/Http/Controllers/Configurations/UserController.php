<?php

namespace App\Http\Controllers\Configurations;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Repositories\Interfaces\UserInterface;
use App\Models\Role;
use App\Models\User;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(private UserInterface $userRepository, private ActivityService $activityService) {}
    /**
     * Recuperation des utilisateurs
     */
    public function index()
    {
        //Activity Log
        $this->activityService->save('Ouverture de la liste des utilisateurs');

        return Inertia::render('configurations/users/index', [
            'module' => 'Configurations',
            'title' => 'Liste des utilisateurs',
            'users' => $this->userRepository->get(),
            'roles' => Role::where('status', 1)->get()
        ]);
    }

    /**
     * Sauvegarde des informations d'un utilisateur
     */
    public function save(UserRequest $request, User $user)
    {
        $data = $request->validated();
        $data['id'] = $user->id ?? 0;
        $data['password'] = !empty($data['password']) ? Hash::make($data['password']) : $user->password;
        $data['created_by'] = request()->method('post') ? auth('web')->user()->name : $user->created_by;

        try {
            $this->userRepository->save($data);
            //Activity Log
            $this->activityService->save('Enregistrement de l\'utilisateur : ' . $user->name);

            return back()->with('success', 'Enregistrement effectué !');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de la sauvegarde d\'un utilisateur : ' . $th->getMessage());
            return back()->with('error', 'Une erreur est survenue : ' . $th->getMessage());
        }
    }


    /**
     * Suppression d'un utilisateur
     */
    public function destroy(User $user)
    {
        try {
            $this->userRepository->destroy($user);
            //Activity Log
            $this->activityService->save('Suppression de l\'utilisateur : ' . $user->name);
            return back()->with('success', 'Suppression effectuée !');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de la suppression d\'un utilisateur : ' . $th->getMessage());
            return back()->with('error', 'Une erreur est survenue : ' . $th->getMessage());
        }
    }

    /**
     * Modification du statut d'un utilisateur
     */

    public function editStatus(User $user)
    {
        try {
            $this->userRepository->status($user);
            //Activity Log
            $this->activityService->save('Edition du statut de l\'utilisateur : ' . $user->name . ' à ' . ($user->status == 1 ? 'Actif' : 'Inactif'));
            return back()->with('success', 'Mise à jour effectuée !');
        } catch (\Throwable $th) {
            logger()->error('Erreur lors de la modification du statut d\'un utilisateur : ' . $th->getMessage());
            return back()->with('error', 'Une erreur est survenue : ' . $th->getMessage());
        }
    }
}
