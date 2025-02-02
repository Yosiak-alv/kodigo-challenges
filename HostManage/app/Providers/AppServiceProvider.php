<?php

namespace App\Providers;

use App\Models\Accommodation;
use App\Models\Reservation;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::guessPolicyNamesUsing(fn($model) => 'App\\Policies\\'.class_basename($model).'Policy');
        Vite::prefetch(concurrency: 3);
    }
}
