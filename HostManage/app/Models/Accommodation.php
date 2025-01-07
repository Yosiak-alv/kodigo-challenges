<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accommodation extends Model
{
    /** @use HasFactory<\Database\Factories\AccommodationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function scopeFilter($query , array $filters): void {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->where(fn($query) =>
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
            );
        });
    }
}
