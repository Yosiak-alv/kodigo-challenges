<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * @OA\Tag(name="AuthController", description="API Endpoints of Auth Controller")
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/login",
     *     summary="Login",
     *     description="Login",
     *     tags={"AuthController"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="email",type="string",description="User email", example="example@example.com"),
     *              @OA\Property(property="password",type="string",description="User password", example="password"),
     *         ),
     *     ),
     *     @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *     )
     * )
     */
    public function login(Request $request): JsonResponse
    {
        $atExpireTime = now()->addMinutes(5);
        $credentials = $request->only('email', 'password');


        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('authToken',[], $atExpireTime)->plainTextToken;

            return $this->sendResponse(
                [
                    'token' => $token,
                    'expires_at' => $atExpireTime
                ], 'User login successfully'
            );
        }

        return $this->sendError('Unauthorised', [], 401);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/refresh-token",
     *     summary="Refresh Token",
     *     description="Refresh Token",
     *     tags={"AuthController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *     )
     * )
     */
    public function refreshToken(Request $request): JsonResponse
    {
        $atExpireTime = now()->addMinutes(5);
        $user = $request->user();

        $user->currentAccessToken()->delete();

        $newToken = $user->createToken('authToken', [], $atExpireTime)->plainTextToken;

        return $this->sendResponse(
            [
                'token' => $newToken,
                'expires_at' => $atExpireTime
            ], 'Token refreshed successfully'
        );
    }
}
