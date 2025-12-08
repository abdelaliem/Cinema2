<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;

class SeatController extends Controller
{
    public function index()
    {
        return Seat::all();
    }

    public function store(Request $request)
    {
        return Seat::create($request->all());
    }

    public function show($id)
    {
        return Seat::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $seat = Seat::findOrFail($id);
        $seat->update($request->all());
        return $seat;
    }

    public function destroy($id)
    {
        Seat::destroy($id);
        return response()->json(['message' => 'Seat deleted']);
    }
}
