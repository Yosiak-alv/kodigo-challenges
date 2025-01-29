<?php

namespace App\Http\Services\Auth;

use App\Http\Requests\LoginRequest;

interface AuthService
{
    public function login(LoginRequest $request);

    public function logout();

    public function me();

    public function refreshToken();
}
