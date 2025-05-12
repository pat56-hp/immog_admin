<?php

namespace App\Providers;

use App\Repositories\ActivityRepository;
use App\Repositories\biens\AppartementRepository;
use App\Repositories\biens\TypeAppartementRepository;
use App\Repositories\Interfaces\ActivityInterface;
use App\Repositories\Interfaces\biens\AppartementInterface;
use App\Repositories\Interfaces\biens\TypeAppartementInterface;
use App\Repositories\Interfaces\SettingInterface;
use App\Repositories\Interfaces\UserInterface;
use App\Repositories\Interfaces\utilisateurs\ProprietaireInterface;
use App\Repositories\Interfaces\utilisateurs\LocataireInterface;
use App\Repositories\SettingRepository;
use App\Repositories\UserRepository;
use App\Repositories\utilisateurs\ProprietaireRepository;
use App\Repositories\utilisateurs\LocataireRepository;
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
        $this->app->bind(SettingInterface::class, SettingRepository::class);
        $this->app->bind(ProprietaireInterface::class, ProprietaireRepository::class);
        $this->app->bind(LocataireInterface::class, LocataireRepository::class);
        $this->app->bind(AppartementInterface::class, AppartementRepository::class);
        $this->app->bind(TypeAppartementInterface::class, TypeAppartementRepository::class);
        $this->app->bind(AppartementInterface::class, AppartementRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
