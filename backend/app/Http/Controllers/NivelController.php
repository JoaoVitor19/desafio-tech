<?php

namespace App\Http\Controllers;

use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class NivelController extends Controller
{
    public function index()
    {
        $niveis = Nivel::all();
        return response()->json($niveis);
    }

    public function show($id)
    {
        $nivel = Nivel::findOrFail($id);
        return response()->json($nivel);
    }

    public function store(Request $request)
    {
        $nivel = Nivel::create($request->all());
        return response()->json($nivel, 201);
    }

    public function update(Request $request, $id)
    {
        $nivel = Nivel::findOrFail($id);
        $nivel->update($request->all());
        return response()->json($nivel, 200);
    }

    public function destroy($id)
    {
        Nivel::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
