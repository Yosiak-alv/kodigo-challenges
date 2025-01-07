<?php

namespace App\Http\Services;

use App\Http\Requests\AccommodationRequest;
use App\Models\Accommodation;

class AccommodationService
{

    public function store(AccommodationRequest $request)
    {
        Accommodation::create($request->validated());
        return redirect()->route('accommodations.index')->with([
            'message' => 'Accommodation created successfully',
            'type' => 'success',
        ]);
    }

    public function update(AccommodationRequest $request, Accommodation $accommodation)
    {
        $accommodation->update($request->validated());
        return redirect()->route('accommodations.index')->with([
            'message' => 'Accommodation updated successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(Accommodation $accommodation)
    {
        $accommodation->delete();
        return redirect()->route('accommodations.index')->with([
            'message' => 'Accommodation deleted successfully',
            'type' => 'success',
        ]);
    }
}
