<?php

namespace App\Http\Services;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResponseResource;
use App\Models\User;
use Illuminate\Http\Request;
class UserServiceImpl implements UserService
{
    public function dashboard(): array
    {
        $dailyRegistrations = User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->take(7) // 7 days
            ->get();

        $weeklyRegistrations = User::selectRaw('YEARWEEK(created_at) as week, COUNT(*) as count')
            ->groupBy('week')
            ->orderBy('week', 'desc')
            ->take(4) // 4 weeks
            ->get();

        $monthlyRegistrations = User::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->take(12) //12 months
            ->get();

        return [
            'daily' => $dailyRegistrations,
            'weekly' => $weeklyRegistrations,
            'monthly' => $monthlyRegistrations,
        ];
    }

    public function findAll(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return UserResponseResource::collection(User::all());
    }

    public function findById(User $user): User
    {
        return $user;
    }

    public function create(UserRequest $request): User
    {
        $attr = $request->validated();

        $attr['password'] = bcrypt($request->password);
        return User::create($attr);
    }

    public function update(User $user, Request $request): User
    {
        $request->validate([
            'name' => 'required|string',
            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
            'password' => 'required|string',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        return $user;
    }

    public function delete(User $user): bool
    {
        return $user->delete();
    }
}
