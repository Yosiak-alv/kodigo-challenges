<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
trait HttpResponseTrait
{
    protected function successResponse($message, $data = [], $statusCode = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'status' => $statusCode
        ], $statusCode);
    }

    protected function errorResponse($errors = [], $statusCode = null)
    {
        if (is_string($errors)) {
            return response()->json([
                'message' => $errors,
                'status' => $statusCode
            ], $statusCode);
        }

        return response()->json([
            'errors' => $errors
        ]);
    }

    protected function notAuthorizedResponse($message)
    {
        return $this->errorResponse([
            'status' => 401,
            'message' => $message,
            'source' => ''
        ]);
    }
}
