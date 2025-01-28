<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResponseDto;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * @OA\Tag(name="UserController", description="API Endpoints of User Controller")
 */
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/users",
     *     summary="Get all users",
     *     description="Get all users",
     *     tags={"UserController"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *      response=200,
     *      description="Successful operation",
     *     )
     *  )
     */
    public function index(): JsonResponse
    {
        return $this->sendResponse(UserResponseDto::collection(User::all()), 'Users retrieved successfully.');
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
     *      response=201,
     *      description="User created successfully",
     *     )
     *  )
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        return $this->sendResponse(new UserResponseDto($user), 'User created successfully.', Response::HTTP_CREATED);
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
     *      response=200,
     *      description="Successful operation",
     *     )
     *  )
     */
    public function show($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        return $this->sendResponse(new UserResponseDto($user), 'User retrieved successfully.');
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
     *               @OA\Property(property="password",type="string",description="User password", example="password"),
     *          ),
     *      ),
     *     @OA\Response(
     *      response=200,
     *      description="User updated successfully",
     *     )
     *  )
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $user = User::find($id);

        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->password = bcrypt($input['password']);
        $user->save();

        return $this->sendResponse(new UserResponseDto($user), 'User updated successfully.');
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
     *      response=204,
     *      description="User deleted successfully",
     *     )
     *  )
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        if (auth()->id() === $user->id) {
            return $this->sendError('You cannot delete yourself.', [], Response::HTTP_FORBIDDEN);
        }

        $user->delete();
        return $this->sendResponse(null, 'User deleted successfully.', Response::HTTP_OK);
    }
}
