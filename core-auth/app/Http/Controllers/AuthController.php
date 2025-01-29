<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
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
     *            response=200,
     *            description="Login successful",
     *            @OA\JsonContent(
     *                type="object",
     *                @OA\Property(property="data", type="object"),
     *                @OA\Property(property="status", type="integer", example=200),
     *                @OA\Property(property="message", type="string", example="OK")
     *            )
     *       ),
     *       @OA\Response(
     *             response=400,
     *             description="Bad request",
     *             @OA\JsonContent(
     *                 type="object",
     *                 @OA\Property(property="data", type="object"),
     *                 @OA\Property(property="status", type="integer", example=400),
     *                 @OA\Property(property="message", type="string", example="BAD REQUEST")
     *             )
     *        ),
     *        @OA\Response(
     *              response=500,
     *              description="Internal server error",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=500),
     *                  @OA\Property(property="message", type="string", example="INTERNAL SERVER ERROR")
     *              )
     *         )
     * )
     */
    public function login(AuthRequest $request): JsonResponse
    {
        $atExpireTime = now()->addMinutes(5);
        $credentials = $request->validated();


        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('authToken',[], $atExpireTime)->plainTextToken;

            return $this->sendResponse(
                [
                    'token' => $token,
                    'expires_at' => $atExpireTime->format('Y-m-d H:i:s')
                ]
            );
        }

        return $this->sendError('email or password doesnt match, please check.', [], 401);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/refresh-token",
     *     summary="Refresh Token",
     *     description="Refresh Token",
     *     tags={"AuthController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *             response=200,
     *             description="Login successful",
     *             @OA\JsonContent(
     *                 type="object",
     *                 @OA\Property(property="data", type="object"),
     *                 @OA\Property(property="status", type="integer", example=200),
     *                 @OA\Property(property="message", type="string", example="OK")
     *             )
     *        ),
     *      @OA\Response(
     *               response=401,
     *               description="Unauthorized",
     *               @OA\JsonContent(
     *                   type="object",
     *                   @OA\Property(property="data", type="object"),
     *                   @OA\Property(property="status", type="integer", example=401),
     *                   @OA\Property(property="message", type="string", example="UNAUTHORIZED")
     *               )
     *          ),
     *        @OA\Response(
     *              response=500,
     *              description="Internal server error",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=500),
     *                  @OA\Property(property="message", type="string", example="INTERNAL SERVER ERROR")
     *              )
     *         )
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
                'expires_at' => $atExpireTime->format('Y-m-d H:i:s')
            ]
        );
    }
}
