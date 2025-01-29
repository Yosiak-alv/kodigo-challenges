<?php

namespace App\Providers;

use App\Http\Services\Auth\AuthService;
use App\Http\Services\Auth\AuthServiceImpl;
use App\Http\Services\User\UserService;
use App\Http\Services\User\UserServiceImpl;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserService::class, UserServiceImpl::class);
        $this->app->bind(AuthService::class, AuthServiceImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
