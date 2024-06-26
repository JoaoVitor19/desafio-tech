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
        $rules = [
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string|max:255',
            'sexo' => 'required',
            'data_nascimento' => 'required|date_format:Y-m-d',
            'hobby' => 'required|string|max:255',
        ];

        $messages = [
            'nivel_id.required' => 'O campo nível é obrigatório.',
            'nivel_id.exists' => 'O nível selecionado não existe.',
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.string' => 'O campo nome deve ser uma string.',
            'nome.max' => 'O campo nome não pode ter mais que 255 caracteres.',
            'sexo.required' => 'O campo sexo é obrigatório.',
            'data_nascimento.required' => 'O campo data de nascimento é obrigatório.',
            'data_nascimento.date_format' => 'O campo data de nascimento deve estar no formato Y-m-d.',
            'hobby.required' => 'O campo hobby é obrigatório.',
            'hobby.string' => 'O campo hobby deve ser uma string.',
            'hobby.max' => 'O campo hobby não pode ter mais que 255 caracteres.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['mensagem' => array_values($validator->errors()->all())], 400);
        }

        $desenvolvedor = Desenvolvedor::create($request->all());
        return response()->json(new DesenvolvedorResource($desenvolvedor), 201);
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'nivel_id' => 'required|exists:niveis,id',
            'nome' => 'required|string|max:255',
            'sexo' => 'required',
            'data_nascimento' => 'required|date_format:Y-m-d',
            'hobby' => 'required|string|max:255',
        ];

        $messages = [
            'nivel_id.required' => 'O campo nível é obrigatório.',
            'nivel_id.exists' => 'O nível selecionado não existe.',
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.string' => 'O campo nome deve ser uma string.',
            'nome.max' => 'O campo nome não pode ter mais que 255 caracteres.',
            'sexo.required' => 'O campo sexo é obrigatório.',
            'data_nascimento.required' => 'O campo data de nascimento é obrigatório.',
            'data_nascimento.date_format' => 'O campo data de nascimento deve estar no formato Y-m-d.',
            'hobby.required' => 'O campo hobby é obrigatório.',
            'hobby.string' => 'O campo hobby deve ser uma string.',
            'hobby.max' => 'O campo hobby não pode ter mais que 255 caracteres.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['mensagem' => array_values($validator->errors()->all())], 400);
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
