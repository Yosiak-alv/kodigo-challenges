<?php

namespace App\Exceptions;


use App\Traits\HttpResponseTrait;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class GenericExceptionHandler
{
    use HttpResponseTrait;

    public function handleException(Throwable $e, Request $request)
    {
        // Unwrap wrapped exceptions
        $exception = $e;
        while ($exception->getPrevious()) {
            $exception   = $exception->getPrevious();
        }

        if ($exception instanceof ModelNotFoundException) {
            return $this->handleModelNotFoundException($exception);
        }

        if ($exception instanceof ValidationException) {
            return $this->handleValidationException($exception);
        }

        if ($exception instanceof AuthenticationException) {
            return $this->handleAuthenticationException($exception);
        }

        return $this->handleGenericException($exception);
    }

    protected function handleValidationException(ValidationException $e)
    {
        $errors = [];

        foreach ($e->errors() as $key => $messages) {
            $errors[$key] = $messages[0];
        }

        $response = [
            'data' => [
                'message' => "The given data was invalid.",
                'errors' => $errors,
                'timestamp' => now()->format('Y-m-d H:i:s'),
            ],
            'status' => ResponseAlias::HTTP_BAD_REQUEST,
            'message' => strtoupper(Response::$statusTexts[ResponseAlias::HTTP_BAD_REQUEST]),
        ];

        return response()->json($response, 400);
    }

    protected function handleModelNotFoundException(ModelNotFoundException $e)
    {
        $response = [
            'data' => [
                'source' => $e->getModel(),
                'message' => 'The resource cannot be found.',
                'timestamp' => now()->format('Y-m-d H:i:s'),
            ],
            'status' => ResponseAlias::HTTP_NOT_FOUND,
            'message' => strtoupper(Response::$statusTexts[ResponseAlias::HTTP_NOT_FOUND]),
        ];
        return response()->json($response,404);
    }

    protected function handleAuthenticationException(AuthenticationException $e)
    {
        $response = [
            'data' => [
                'message' => 'Unauthenticated',
                'timestamp' => now()->format('Y-m-d H:i:s'),
                'source' => '',
            ],
            'status' => ResponseAlias::HTTP_UNAUTHORIZED,
            'message' => strtoupper(Response::$statusTexts[ResponseAlias::HTTP_UNAUTHORIZED]),
        ];
        return response()->json($response,401);
    }

    protected function handleGenericException(Throwable $e)
    {
        return response()->json([
            'data' => [
                'message' => 'An error occurred.',
                'errors' => [
                        'type' => class_basename($e),
                        'message' => $e->getMessage(),
                        'source' => 'Line: ' . $e->getLine() . ' in ' . $e->getFile(),
                        'timestamp' => now()->format('Y-m-d H:i:s'),
                ],
            ],
            'status' => ResponseAlias::HTTP_INTERNAL_SERVER_ERROR,
            'message' => strtoupper(Response::$statusTexts[ResponseAlias::HTTP_INTERNAL_SERVER_ERROR]),
        ], 500);
    }
}
