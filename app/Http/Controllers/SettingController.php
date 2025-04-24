<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingRequest;
use App\Repositories\Interfaces\SettingInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct(private SettingInterface $settingRepository){}

    public function __invoke(SettingRequest $request){
        $data = $request->validated();

        try {
            $this->settingRepository->store($data);
            return redirect()->back()->with('success', 'Settings updated successfully');
        } catch (\Throwable $th) {
           return redirect()->back()->with('error', 'Une erreur est surveneu : '. $th->getMessage());
        }
    }

    
}
