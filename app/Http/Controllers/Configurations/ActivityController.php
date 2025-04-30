<?php

namespace App\Http\Controllers\Configurations;

use App\Http\Controllers\Controller;
use App\Repositories\Interfaces\ActivityInterface;
use App\Services\ActivityService;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function __construct(private ActivityInterface $activityRepository, private ActivityService $activityService) {}

    public function index()
    {
        //Activity Log
        $this->activityService->save('Ouverture de l\'historique d\'activités');

        return Inertia::render(('configurations/activities/index'), [
            'module' => 'Configurations',
            'title' => 'Historique d\'activités',
            'activities' => $this->activityRepository->get(),
        ]);
    }
}
