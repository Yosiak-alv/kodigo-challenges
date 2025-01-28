<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class CheckTokenExpiration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        $personalAccessToken = PersonalAccessToken::findToken($token);

        if (!$personalAccessToken || $personalAccessToken->created_at->addMinutes(5)->isPast()) {
            return response()->json(['message' => 'Token expired'], 401);
        }

        return $next($request);
    }
}
