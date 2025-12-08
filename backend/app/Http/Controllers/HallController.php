<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function index()
    {
        return Hall::all();
    }

    public function store(Request $request)
    {
        return Hall::create($request->all());
    }

    public function show($id)
    {
        return Hall::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $hall = Hall::findOrFail($id);
        $hall->update($request->all());
        return $hall;
    }

    public function destroy($id)
    {
        Hall::destroy($id);
        return response()->json(['message' => 'Hall deleted']);
    }
}
