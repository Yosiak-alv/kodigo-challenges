<?php

namespace App\Http\Controllers;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

use Illuminate\Routing\Controller as BaseController;
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
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    // success response method
    public function sendResponse($data, $code = 200): JsonResponse
    {
        $response = [
            'data'    => $data,
            'status'  => $code,
            'message' => strtoupper(Response::$statusTexts[$code]),
        ];

        return response()->json($response, $code);
    }

    // return error response
    public function sendError($message, $errorMessages = [], $code = 500)
    {
        $data = [
            'status' => $code,
            'message' => $message,
            'timestamp' => now()->format('Y-m-d H:i:s'),
        ];

        if(!empty($errorMessages)){
            $data['errors'] = $errorMessages;
        }

        $response = [
            'data' => $data,
            'status' => $code,
            'message' => strtoupper(Response::$statusTexts[$code]),
        ];

        return response()->json($response, $code);
    }
}
