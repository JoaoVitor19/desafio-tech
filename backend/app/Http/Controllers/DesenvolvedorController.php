<?php

namespace App\Http\Controllers;

use App\Http\Resources\DesenvolvedorCollection;
use App\Http\Resources\DesenvolvedorResource;
use App\Models\Desenvolvedor;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class DesenvolvedorController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);
        $search = $request->query('search', '');

        if (!empty($search)) {
            $desenvolvedores = Desenvolvedor::whereRaw('LOWER(nome) like ?', ['%' . strtolower($search) . '%'])
                ->paginate($perPage, ['*'], 'page', $page);
        } else {
            $desenvolvedores = Desenvolvedor::paginate($perPage, ['*'], 'page', $page);
        }

        return response()->json(new DesenvolvedorCollection($desenvolvedores));
    }

    public function show($id)
    {
        $desenvolvedor = Desenvolvedor::find($id);

        if ($desenvolvedor == null) {
            return response()->json(null, 404);
        }

        return response()->json(new DesenvolvedorResource($desenvolvedor));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'data_nascimento' => 'required|date_format:Y-m-d',
            'hobby' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $desenvolvedor = Desenvolvedor::create($request->all());
        return response()->json(new DesenvolvedorResource($desenvolvedor), 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'data_nascimento' => 'required|date_format:Y-m-d',
            'hobby' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $desenvolvedor = Desenvolvedor::find($id);

        if ($desenvolvedor == null) {
            return response()->json(null, 404);
        }

        $desenvolvedor->update($request->all());
        return response()->json(new DesenvolvedorResource($desenvolvedor));
    }

    public function destroy($id)
    {
        $desenvolvedor = Desenvolvedor::find($id);

        if ($desenvolvedor == null) {
            return response()->json(null, 404);
        }

        $desenvolvedor->delete();

        return response()->json(null, 204);
    }
}
