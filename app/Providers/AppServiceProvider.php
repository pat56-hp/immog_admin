<?php

namespace App\Providers;

use App\Repositories\ActivityRepository;
use App\Repositories\Interfaces\ActivityInterface;
use App\Repositories\Interfaces\UserInterface;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(ActivityInterface::class, ActivityRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
