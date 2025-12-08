<?php

namespace App\Http\Controllers;

use App\Models\Showtime;
use Illuminate\Http\Request;

class ShowtimeController extends Controller
{
    public function index()
    {
        return Showtime::all();
    }

    public function store(Request $request)
    {
        return Showtime::create($request->all());
    }

    public function show($id)
    {
        return Showtime::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $showtime = Showtime::findOrFail($id);
        $showtime->update($request->all());
        return $showtime;
    }

    public function destroy($id)
    {
        Showtime::destroy($id);
        return response()->json(['message' => 'Showtime deleted']);
    }
}
