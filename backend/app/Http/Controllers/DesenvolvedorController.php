<?php

namespace App\Http\Controllers;

use App\Models\Desenvolvedor;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class DesenvolvedorController extends Controller
{
    public function index()
    {
        $desenvolvedores = Desenvolvedor::all();
        return response()->json($desenvolvedores);
    }

    public function show($id)
    {
        $desenvolvedor = Desenvolvedor::findOrFail($id);
        return response()->json($desenvolvedor);
    }

    public function store(Request $request)
    {
        $desenvolvedor = Desenvolvedor::create($request->all());
        return response()->json($desenvolvedor, 201);
    }

    public function update(Request $request, $id)
    {
        $desenvolvedor = Desenvolvedor::findOrFail($id);
        $desenvolvedor->update($request->all());
        return response()->json($desenvolvedor, 200);
    }

    public function destroy($id)
    {
        Desenvolvedor::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
