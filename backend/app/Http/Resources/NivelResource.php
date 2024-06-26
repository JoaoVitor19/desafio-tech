<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class NivelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nivel' => $this->nivel,
            'desenvolvedores_count' => $this->desenvolvedores_count
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
        ];
    }
}
