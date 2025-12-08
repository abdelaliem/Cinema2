<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        return Movie::all();
    }

    public function store(Request $request)
    {
        return Movie::create($request->all());
    }

    public function show($id)
    {
        return Movie::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);
        $movie->update($request->all());
        return $movie;
    }
    public function getShows($id)
    {
        $movie = Movie::with('showtimes')->findOrFail($id);
        return $movie->showtimes;
    }

    public function destroy($id)
    {
        Movie::destroy($id);
        return response()->json(['message' => 'Movie deleted']);
    }
}
