<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DesenvolvedorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $dataNascimento = Carbon::createFromFormat('Y-m-d', $this->data_nascimento);

        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'sexo' => $this->sexo,
            'data_nascimento' => $this->data_nascimento,
            'idade' => intval($dataNascimento->diffInYears(Carbon::now())),
            'hobby' => $this->hobby,
            'nivel' => [
                'id' => $this->nivel->id,
                'nivel' => $this->nivel->nivel,
            ]
        ];
    }

    public function with($request)
    {
        return [
            'success' => true,
        ];
    }
}
