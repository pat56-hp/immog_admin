<?php

namespace App\Http\Controllers\Configurations;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Repositories\Interfaces\SettingInterface;

class SettingController extends Controller
{
    public function __construct(private SettingInterface $settingRepository){}

    public function __invoke(SettingRequest $request){
        $data = $request->validated();

        if ($request->hasFile('logo')) $data['logo'] = storeFile('logo', 'uploads', $request->file('logo'));
        if ($request->hasFile('favicon')) $data['favicon'] = storeFile('favicon', 'uploads', $request->file('favicon'));

        try {
            $this->settingRepository->store($data);
            return back()->with('success', 'Informations enregistrées avec succès');
        } catch (\Throwable $th) {
           return back()->with('error', 'Une erreur est surveneu : '. $th->getMessage());
        }
    }    
}
