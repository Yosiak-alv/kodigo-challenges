<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TokensResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
           'id' => $this->id,
           //'tokenable_type' => $this->tokenable_type,
           //'tokenable_id' => $this->tokenable_id,
           'name' => $this->name,
           //'abilities' => $this->abilities,
           'last_used_at' => $this->last_used_at?->format('Y-m-d H:i:s') ?? null,
           'expires_at' => $this->expires_at?->format('Y-m-d H:i:s') ?? null,
           'created_at' => $this->created_at->format('Y-m-d H:i:s'),
           'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
       ];
    }
}
