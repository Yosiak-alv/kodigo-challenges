<?php

namespace App\Http\Services\Auth;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

interface AuthService
{
    public function login(LoginRequest $request);

    public function logout();

    public function me();

    public function updatePassword(Request $request);

    public function refreshToken();
}
