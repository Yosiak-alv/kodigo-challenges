<?php

use App\Exceptions\GenericExceptionHandler;
use App\Http\Middleware\CheckTokenExpiration;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;



return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'check-token-expiration' => CheckTokenExpiration::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions)  {
        $exceptions->renderable(function (Throwable $e, Request $request) {
            $genericExceptionHandler = new GenericExceptionHandler();
            return $genericExceptionHandler->handleException($e, $request);
        });
    })->create();
