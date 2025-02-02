<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\TokensResponseResource;
use App\Http\Resources\UserResponseResource;
use App\Http\Services\Auth\AuthService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Tag(name="AuthController", description="API Endpoints of Auth Controller")
 */
class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService){}
    /**
     * @OA\Post(
     *     path="/api/v1/auth/login",
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
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request);

        if (isset($result['token'])) {
            return $this->sendResponse($result);
        }

        return $this->sendResponse($result,Response::HTTP_UNAUTHORIZED);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/refresh-token",
     *     summary="Refresh Token",
     *     description="Refresh Token",
     *     tags={"AuthController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *             response=200,
     *             description="Token refreshed successfully",
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
        return $this->sendResponse($this->authService->refreshToken());
    }
    /**
     * @OA\Post(
     *     path="/api/v1/auth/logout",
     *     summary="Logout",
     *     description="Logout",
     *     tags={"AuthController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *             response=200,
     *             description="Logout successful",
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
    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return $this->sendResponse(['message' => 'Logout successfully']);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/auth/me",
     *     summary="Get current authenticated user",
     *     description="Get current authenticated user",
     *     tags={"AuthController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *             response=200,
     *             description="Get current authenticated user",
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
    public function getCurrentUser(Request $request): JsonResponse
    {
        return $this->sendResponse($this->authService->me());
    }

    /**
     * @OA\Patch(
     *     path="/api/v1/auth/update-password",
     *     summary="Update Password",
     *     description="Update Password",
     *     tags={"AuthController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *               type="object",
     *               @OA\Property(property="currentPassword",type="string",description="Current Password", example="password"),
     *               @OA\Property(property="password",type="string",description="User password", example="password"),
     *               @OA\Property(property="password_confirmation",type="string",description="Confirm the new Password", example="password"),
     *          ),
     *      ),
     *     @OA\Response(
     *             response=200,
     *             description="Logout successful",
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
    public function updatePassword(Request $request): JsonResponse
    {
        return $this->sendResponse($this->authService->updatePassword($request));
    }
}
