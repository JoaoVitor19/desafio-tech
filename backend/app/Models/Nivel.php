<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    use HasFactory;

    protected $table = "niveis";

    protected $fillable = [
        'nivel',
    ];

    // Relacionamento com o model Desenvolvedor
    public function desenvolvedores()
    {
        return $this->hasMany(Desenvolvedor::class);
    }
}
