<?php

namespace App\Http\Services\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\TokensResponseResource;
use App\Http\Resources\UserResponseResource;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AuthServiceImpl implements AuthService
{
    public function login(LoginRequest $request): array
    {
        $atExpireTime = now()->addMinutes(60);
        $credentials = $request->validated();

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('authToken',[], $atExpireTime)->plainTextToken;

            return [
                    'token' => $token,
                    'expires_at' => $atExpireTime->format('Y-m-d H:i:s')
            ];
        }

        return [
            'message' => 'Email or password is incorrect, please try again.'
        ];
    }

    public function logout(): void
    {
        request()->user()->currentAccessToken()->delete();
    }

    public function me(): array
    {
        return [
            'user' => new UserResponseResource(request()->user()),
            'tokens' => TokensResponseResource::collection(request()->user()->tokens)
        ];
    }

    public function updatePassword(Request $request): array
    {
        $request->validate([
            'currentPassword' => ['required', 'current_password'],
            'password' => ['required', Password::min(8), 'confirmed'],
        ]);

        $user = request()->user();
        $user->password = bcrypt($request->password);
        $user->save();

        return [
            'message' => 'Password updated successfully.'
        ];
    }

    public function refreshToken(): array
    {
        $atExpireTime = now()->addMinutes(60);
        $user = request()->user();

        $user->currentAccessToken()->delete();

        $newToken = $user->createToken('authToken', [], $atExpireTime)->plainTextToken;

        return [
            'token' => $newToken,
            'expires_at' => $atExpireTime->format('Y-m-d H:i:s')
        ];
    }
}
