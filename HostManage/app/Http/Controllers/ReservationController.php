<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Services\ReservationService;
use App\Models\Accommodation;
use App\Models\Reservation;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    private ReservationService $service;
    public function __construct(ReservationService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Reservations/Index', [
            'reservations' => Reservation::select('*')
                ->with(['accommodation'])
                ->oldest('check_in')
                ->paginate(8),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Reservations/Create',[
            'accommodations' => Accommodation::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request)
    {
        return $this->service->create($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        return $this->service->delete($reservation);
    }
}
