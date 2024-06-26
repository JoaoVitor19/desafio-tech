<?php

namespace App\Http\Controllers;

use App\Http\Resources\NivelCollection;
use App\Http\Resources\NivelResource;
use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class NivelController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);
        $search = $request->query('search', '');

        if (!empty($search)) {
            $niveis = Nivel::whereRaw('LOWER(nivel) like ?', ['%' . strtolower($search) . '%'])
                ->withCount('desenvolvedores')
                ->paginate($perPage, ['*'], 'page', $page);
        } else {
            $niveis = Nivel::withCount('desenvolvedores')->paginate($perPage, ['*'], 'page', $page);
        }

        return response()->json(new NivelCollection($niveis));
    }

    public function show($id)
    {
        $nivel = Nivel::find($id);

        if ($nivel == null) {
            return response()->json(['mensagem' => "Nivel não encontrado"], 404);
        }

        return response()->json(new NivelResource($nivel));
    }

    public function store(Request $request)
    {
        $rules = [
            'nivel' => 'required|string|max:255',
        ];

        $messages = [
            'nivel.required' => 'O campo nivel é obrigatório.',
            'nivel.string' => 'O campo nivel deve ser uma string.',
            'nivel.max' => 'O campo nivel não pode ter mais que 255 caracteres.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['mensagem' => array_values($validator->errors()->all())], 400);
        }

        $nivel = Nivel::create($request->all());

        return response()->json(new NivelResource($nivel), 201);
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'nivel' => 'required|string|max:255',
        ];

        $messages = [
            'nivel.required' => 'O campo nivel é obrigatório.',
            'nivel.string' => 'O campo nivel deve ser uma string.',
            'nivel.max' => 'O campo nivel não pode ter mais que 255 caracteres.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['mensagem' => array_values($validator->errors()->all())], 400);
        }

        $nivel = Nivel::find($id);

        if ($nivel == null) {
            return response()->json(['mensagem' => "Nivel não encontrado"], 404);
        }

        $nivel->update($request->all());
        return response()->json(new NivelResource($nivel), 200);
    }

    public function destroy($id)
    {
        $nivel = Nivel::find($id);

        if ($nivel == null) {
            return response()->json(['mensagem' => "Nivel não encontrado"], 404);
        }


        if ($nivel->desenvolvedores()->exists()) {
            return response()->json([
                'mensagem' => 'Não é possível remover o nível porque há desenvolvedores associados a ele!'
            ], 400);
        }

        $nivel->delete();

        return response()->json(null, 204);
    }
}
