<?php
namespace App\Repositories;
use App\Models\Activity;
use App\Repositories\Interfaces\ActivityInterface;

class ActivityRepository implements ActivityInterface{

    public function __construct(private Activity $activity){}

    public function get(){
        return $this->activity->latest()->get();
    }

    public function save(array $data){
        $this->activity->create($data);
    }

}