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

        $nivel = Nivel::paginate($perPage, ['*'], 'page', $page);

        return response()->json(new NivelCollection($nivel));
    }

    public function show($id)
    {
        $nivel = Nivel::find($id);

        if ($nivel == null) {
            return response()->json(null, 404);
        }

        return response()->json(new NivelResource($nivel));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nivel' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        
        $nivel = Nivel::create($request->all());

        return response()->json(new NivelResource($nivel), 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nivel' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        
        $nivel = Nivel::find($id);

        if ($nivel == null) {
            return response()->json(null, 404);
        }

        $nivel->update($request->all());
        return response()->json(new NivelResource($nivel), 200);
    }

    public function destroy($id)
    {
        $nivel = Nivel::find($id);

        if ($nivel == null) {
            return response()->json(null, 404);
        }


        if ($nivel->desenvolvedores()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Não é possível remover o nível porque há desenvolvedores associados a ele.'
            ], 400);
        }

        $nivel->delete();

        return response()->json(null, 204);
    }
}
