<?php
namespace App\Repositories\Interfaces;

interface ActivityInterface{
    public function get();
    public function save(array $data);
}