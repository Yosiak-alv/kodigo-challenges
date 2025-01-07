<?php

namespace App\Policies;

use App\Models\User;

class AccommodationPolicy
{
    /**
     * Determine whether the user can access any accommodation-related actions.
     */
    public function before(User $user)
    {
        return $user->role === 'ADMIN';
    }

    /**
     * Determine whether the user can view any accommodations.
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can create accommodation.
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the accommodation.
     */
    public function update(User $user, Accommodation $accommodation)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the accommodation.
     */
    public function delete(User $user, Accommodation $accommodation)
    {
        return true;
    }
}
