<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccommodationRequest;
use App\Http\Services\AccommodationService;
use App\Models\Accommodation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AccommodationController extends Controller
{
    private AccommodationService $service;
    public function __construct(AccommodationService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Accommodation::class);
        return Inertia::render('Accommodations/Index', [
            'accommodations' => Accommodation::select('*')
                ->latest('updated_at')
                ->filter(request()->only('search'))
                ->paginate(10)
                ->withQueryString(),
            'filters' => \Illuminate\Support\Facades\Request::only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Accommodation::class);
        return Inertia::render('Accommodations/CreateEdit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AccommodationRequest $request)
    {
        Gate::authorize('create', Accommodation::class);
        return $this->service->store($request);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Accommodation $accommodation)
    {
        Gate::authorize('update', $accommodation);
        return Inertia::render('Accommodations/CreateEdit',[
            'accommodation' => $accommodation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AccommodationRequest $request, Accommodation $accommodation)
    {
        Gate::authorize('delete', $accommodation);
        return $this->service->update($request, $accommodation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accommodation $accommodation)
    {
        Gate::authorize('delete', $accommodation);
        return $this->service->destroy($accommodation);
    }
}
