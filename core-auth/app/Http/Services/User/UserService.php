<?php

namespace App\Http\Services\User;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;

interface UserService
{
    public function dashboard();

    public function findAll();

    public function findById(User $user): User;

    public function create(UserRequest $request): User;

    public function update(User $user, Request $request ): User;

    public function delete(User $user): bool;
}
