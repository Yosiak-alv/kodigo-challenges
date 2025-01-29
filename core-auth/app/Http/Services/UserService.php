<?php

namespace App\Http\Services;

use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Http\Resources\UserResponseResource;
use App\Models\User;

interface UserService
{
    public function dashboard();

    public function findAll();

    public function findById(User $user): User;

    public function create(UserRequest $request): User;

    public function update(User $user, Request $request ): User;

    public function delete(User $user): bool;
}
