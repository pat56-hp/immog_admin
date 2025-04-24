<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Services\ActivityService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __construct(private ActivityService $activityService){}
    /**
     * Display the user's profile form.
     */
    public function edit(): Response
    {
        //Activity Log
        $this->activityService->save('Ouverture de la page de modification de profil');

        return Inertia::render('profile/edit', [
            'title' => 'Mon profil',
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone')
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        //Activity Log
        $this->activityService->save('Modification de profil');

        return Redirect::route('profile.edit');
    }

    /**
     * Redirect password view
     *
     * @return void
     */
    public function password(){
        //Activity Log
        $this->activityService->save('Ouverture de la page de modification de mot de passe');

        return Inertia::render('profile/edit-password', [
            'title' => 'Modifier mon mot de passe'
        ]);
    }

    /**
     * Update password profile
     *
     * @param PasswordRequest $request
     * @return void
     */
    public function passwordUpdate(PasswordRequest $request){
        $request->user()->update([
            'password' => Hash::make($request->validated('password'))
        ]);

        //Activity Log
        $this->activityService->save('Modification de mot de passe');

        return back();
    }
}
