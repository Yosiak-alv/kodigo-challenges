<?php

namespace App\Http\Controllers;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

/**
 * @OA\Info(title="CORE AUTH API", version="0.1")
 *
 * @OA\SecurityScheme(
 *      type="http",
 *      description="Enter the token returned at login",
 *      name="Authorization",
 *      in="header",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 *      securityScheme="bearerAuth",
 *  )
 */
abstract class Controller
{
    // success response method
    public function sendResponse($data, $message, $code = 200): JsonResponse
    {
        $response = [
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ];

        return response()->json($response, $code);
    }

    // return error response
    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
