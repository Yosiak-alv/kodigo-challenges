<?php

namespace App\Http\Services;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use Illuminate\Http\Client\Request;
use Inertia\Response;

class ReservationService
{
    public function create(ReservationRequest $request)
    {
        $attr = $request->validated();
        $attr['user_id'] = auth()->id();

        $existingReservation = Reservation::where('user_id', $attr['user_id'])
            ->whereDate('check_in', $attr['check_in'])
            ->exists();

        if ($existingReservation) {
            return back()->with([
                'message' => 'You already have a reservation for that date',
                'type' => 'error',
            ]);
        }

        Reservation::create($attr);
        return redirect()->route('reservations.index')->with([
            'message' => 'Reservation created successfully',
            'type' => 'success',
        ]);
    }
    public function delete(Reservation $reservation)
    {
        $reservation->delete();
        return redirect()->route('reservations.index')->with([
            'message' => 'Reservation deleted successfully',
            'type' => 'success',
        ]);
    }
}
