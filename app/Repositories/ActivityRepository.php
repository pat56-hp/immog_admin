<?php

namespace App\Repositories;

use App\Models\Activity;
use App\Repositories\Interfaces\ActivityInterface;

class ActivityRepository implements ActivityInterface
{

    public function __construct(private Activity $activity) {}

    public function paginate($request = null, $perPage =  50)
    {
        $query = $this->activity->query();
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('action', 'LIKE', "%$search%")
                    ->where('country', 'LIKE', "%$search%")
                    ->where('country_code', 'LIKE', "%$search%")
                    ->where('url', 'LIKE', "%$search%")
                    ->where('navigator', 'LIKE', "%$search%")
                    ->where('ip', 'LIKE', "%$search%")
                    ->whereHas('user', fn($q) => $q->where('name', 'LIKE', "%$search%"));
            });
        }
        return $query
            ->latest()
            ->paginate(50)
            ->withQueryString();
    }

    public function save(array $data)
    {
        $this->activity->create($data);
    }
}
