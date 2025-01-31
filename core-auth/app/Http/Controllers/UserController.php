<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResponseResource;
use App\Http\Services\User\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Tag(name="UserController", description="API Endpoints of User Controller")
 */
class UserController extends Controller
{
    public function __construct(private readonly UserService $userService){}

    /**
     * @OA\Get(
     *     path="/api/v1/users/dashboard",
     *     summary="Get all users statistics",
     *     description="Get all users statistics",
     *     tags={"UserController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *            response=200,
     *            description="User statistics retrieved successfully",
     *            @OA\JsonContent(
     *                type="object",
     *                @OA\Property(property="data", type="object"),
     *                @OA\Property(property="status", type="integer", example=200),
     *                @OA\Property(property="message", type="string", example="OK")
     *            )
     *       ),
     *     @OA\Response(
     *             response=401,
     *             description="Unauthorized",
     *             @OA\JsonContent(
     *                 type="object",
     *                 @OA\Property(property="data", type="object"),
     *                 @OA\Property(property="status", type="integer", example=401),
     *                 @OA\Property(property="message", type="string", example="UNAUTHORIZED")
     *             )
     *        ),
     *       @OA\Response(
     *              response=500,
     *              description="Internal server error",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=500),
     *                  @OA\Property(property="message", type="string", example="INTERNAL SERVER ERROR")
     *              )
     *       )
     *  )
     */
    public function dashboard(): JsonResponse
    {
        return $this->sendResponse($this->userService->dashboard());
    }

    /**
     * @OA\Get(
     *     path="/api/v1/users",
     *     summary="Get all users",
     *     description="Get all users",
     *     tags={"UserController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *            response=200,
     *            description="Users retrieved successfully",
     *            @OA\JsonContent(
     *                type="object",
     *                @OA\Property(property="data", type="object"),
     *                @OA\Property(property="status", type="integer", example=200),
     *                @OA\Property(property="message", type="string", example="OK")
     *            )
     *       ),
     *     @OA\Response(
     *             response=401,
     *             description="Unauthorized",
     *             @OA\JsonContent(
     *                 type="object",
     *                 @OA\Property(property="data", type="object"),
     *                 @OA\Property(property="status", type="integer", example=401),
     *                 @OA\Property(property="message", type="string", example="UNAUTHORIZED")
     *             )
     *        ),
     *       @OA\Response(
     *              response=500,
     *              description="Internal server error",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=500),
     *                  @OA\Property(property="message", type="string", example="INTERNAL SERVER ERROR")
     *              )
     *       )
     *  )
     */
    public function index(): JsonResponse
    {
        return $this->sendResponse(UserResponseResource::collection(User::all()));
    }

    /**
     * @OA\Post(
     *     path="/api/v1/users",
     *     summary="Create a user",
     *     description="Create a user",
     *     tags={"UserController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="name",type="string",description="User name", example="John Doe"),
     *              @OA\Property(property="email",type="string",description="User email", example="example@example.com"),
     *              @OA\Property(property="password",type="string",description="User password", example="password"),
     *         ),
     *     ),
     *     @OA\Response(
     *           response=201,
     *           description="User created successfully",
     *           @OA\JsonContent(
     *               type="object",
     *               @OA\Property(property="data", type="object"),
     *               @OA\Property(property="status", type="integer", example=201),
     *               @OA\Property(property="message", type="string", example="CREATED")
     *           )
     *      ),
     *      @OA\Response(
     *            response=400,
     *            description="Bad request",
     *            @OA\JsonContent(
     *                type="object",
     *                @OA\Property(property="data", type="object"),
     *                @OA\Property(property="status", type="integer", example=400),
     *                @OA\Property(property="message", type="string", example="BAD REQUEST")
     *            )
     *       ),
     *     @OA\Response(
     *              response=401,
     *              description="Unauthorized",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=401),
     *                  @OA\Property(property="message", type="string", example="UNAUTHORIZED")
     *              )
     *         ),
     *       @OA\Response(
     *             response=500,
     *             description="Internal server error",
     *             @OA\JsonContent(
     *                 type="object",
     *                 @OA\Property(property="data", type="object"),
     *                 @OA\Property(property="status", type="integer", example=500),
     *                 @OA\Property(property="message", type="string", example="INTERNAL SERVER ERROR")
     *             )
     *        )
     *  )
     */
    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request);
        return $this->sendResponse(new UserResponseResource($user),  Response::HTTP_CREATED);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/users/{id}",
     *     summary="Get a user",
     *     description="Get a user",
     *     tags={"UserController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *             response=200,
     *             description="User retrieved successfully",
     *             @OA\JsonContent(
     *                 type="object",
     *                 @OA\Property(property="data", type="object"),
     *                 @OA\Property(property="status", type="integer", example=200),
     *                 @OA\Property(property="message", type="string", example="OK")
     *             )
     *        ),
     *     @OA\Response(
     *              response=401,
     *              description="Unauthorized",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=401),
     *                  @OA\Property(property="message", type="string", example="UNAUTHORIZED")
     *              )
     *         ),
     *         @OA\Response(
     *               response=500,
     *               description="Internal server error",
     *               @OA\JsonContent(
     *                   type="object",
     *                   @OA\Property(property="data", type="object"),
     *                   @OA\Property(property="status", type="integer", example=500),
     *                   @OA\Property(property="message", type="string", example="INTERNAL SERVER ERROR")
     *               )
     *          )
     *  )
     */
    public function show(User $user): JsonResponse
    {
        return $this->sendResponse(new UserResponseResource($this->userService->findById($user)));
    }

    /**
     * @OA\Put(
     *     path="/api/v1/users/{id}",
     *     summary="Update a user",
     *     description="Update a user",
     *     tags={"UserController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *               type="object",
     *               @OA\Property(property="name",type="string",description="User name", example="John Doe"),
     *               @OA\Property(property="email",type="string",description="User email", example="example@example.com"),
     *          ),
     *      ),
     *     @OA\Response(
     *            response=200,
     *            description="User updated successfully",
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
     *     @OA\Response(
     *              response=401,
     *              description="Unauthorized",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=401),
     *                  @OA\Property(property="message", type="string", example="UNAUTHORIZED")
     *              )
     *         ),
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
     *  )
     */
    public function update(Request $request, User $user)
    {
        $updatedUser = $this->userService->update($user, $request);

        return $this->sendResponse(new UserResponseResource($updatedUser));
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/users/{id}",
     *     summary="Delete a user",
     *     description="Delete a user",
     *     tags={"UserController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *             response=200,
     *             description="User deleted successfully",
     *             @OA\JsonContent(
     *                 type="object",
     *                 @OA\Property(property="data", type="object"),
     *                 @OA\Property(property="status", type="integer", example=200),
     *                 @OA\Property(property="message", type="string", example="OK")
     *             )
     *        ),
     *     @OA\Response(
     *              response=401,
     *              description="Unauthorized",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=401),
     *                  @OA\Property(property="message", type="string", example="UNAUTHORIZED")
     *              )
     *         ),
     *        @OA\Response(
     *              response=403,
     *              description="Forbidden",
     *              @OA\JsonContent(
     *                  type="object",
     *                  @OA\Property(property="data", type="object"),
     *                  @OA\Property(property="status", type="integer", example=403),
     *                  @OA\Property(property="message", type="string", example="FORBIDDEN")
     *              )
     *         ),
     *         @OA\Response(
     *               response=500,
     *               description="Internal server error",
     *               @OA\JsonContent(
     *                   type="object",
     *                   @OA\Property(property="data", type="object"),
     *                   @OA\Property(property="status", type="integer", example=500),
     *                   @OA\Property(property="message", type="string", example="INTERNAL SERVER ERROR")
     *               )
     *          )
     *  )
     */
    public function destroy(User $user) : JsonResponse
    {
        if (auth()->id() === $user->id) {
            return $this->sendError('You cannot delete yourself.', [], Response::HTTP_FORBIDDEN);
        }

        $delete = $this->userService->delete($user);
        if (!$delete) {
            return $this->sendError('User could not be deleted.', [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->sendResponse(['message' => 'User deleted successfully'], Response::HTTP_OK);
    }
}
