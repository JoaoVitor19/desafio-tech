<?php

namespace Database\Seeders;

use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Nivel::factory()->create([
            'nivel' => "Programador Junior",
        ]);

        Nivel::factory()->create([
            'nivel' => "Programador Pleno",
        ]);

        Nivel::factory()->create([
            'nivel' => "Programador Senior",
        ]);

        Desenvolvedor::factory()->create([
            'nivel_id' => "1",
            'nome' => "Enzo",
            'sexo' => "Não binário",
            'data_nascimento' => date('22-10-2006'),
            'hobby' => "League of Legends"
        ]);

        Desenvolvedor::factory()->create([
            'nivel_id' => "2",
            'nome' => "João Vitor",
            'sexo' => "Masculino",
            'data_nascimento' => date('27-09-2000'),
            'hobby' => "Programação, Filmes, Séries, Jogos e Livros"
        ]);

        Desenvolvedor::factory()->create([
            'nivel_id' => "3",
            'nome' => "Stephan Rafael",
            'sexo' => "Masculino",
            'data_nascimento' => date('27-09-1996'),
            'hobby' => "Hackear a Nasa"
        ]);
    }
}
