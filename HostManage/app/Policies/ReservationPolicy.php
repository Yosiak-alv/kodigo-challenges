<?php

namespace App\Policies;

use App\Models\User;

class ReservationPolicy
{
    public function before(User $user)
    {
        return $user->role === 'USER';
    }

    public function viewAny(User $user)
    {
        return true;
    }

    public function create(User $user)
    {
        return true;
    }

    public function delete(User $user, Reservation $reservation)
    {
        return $reservation->user_id === $user->id;
    }
}
