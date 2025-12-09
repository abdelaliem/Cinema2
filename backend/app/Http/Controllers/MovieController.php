<?php

namespace App\Http\Controllers;

use App\Models\BookingSeat;
use App\Models\Movie;
use App\Models\Showtime;
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
        $movie = Movie::with('showtimes.hall')->findOrFail($id);

        return $movie->showtimes->map(function ($showtime) {
            return [
                'id' => $showtime->id,
                'start_time' => $showtime->start_time,
                'end_time'   => $showtime->end_time,
                'hall'       => $showtime->hall->name,
                'total_seats' => $showtime->hall->seats()->count(),
                'available_seats' => $this->getAvailableSeats($showtime->id),
            ];
        });
    }


    public function destroy($id)
    {
        Movie::destroy($id);
        return response()->json(['message' => 'Movie deleted']);
    }

public function getAvailableSeats($showtimeId)
{
    $showtime = Showtime::with('hall.seats')->findOrFail($showtimeId);

    // get ALL seat IDs in this hall
    $allSeatIds = $showtime->hall->seats->pluck('id')->toArray();

    // get booked seat IDs for this showtime
    $bookedSeatIds = BookingSeat::query()
        ->join('bookings', 'bookings.id', '=', 'booking_seats.booking_id')
        ->where('bookings.showtime_id', $showtimeId)
        ->pluck('seat_id')
        ->toArray();

    // available seats = all - booked
    return array_values(array_diff($allSeatIds, $bookedSeatIds));
}



    public function selectSeats(Request $request)
{
    $validated = $request->validate([
        'showtime_id' => 'required|exists:showtimes,id',
        'seat_ids' => 'required|array',
        'seat_ids.*' => 'integer|exists:seats,id'
    ]);

    $available = $this->getAvailableSeats($validated['showtime_id']);
    $requested = $validated['seat_ids'];

    // check if any requested seats are NOT available
    if (!empty(array_diff($requested, $available))) {
        return response()->json(['error' => 'Some seats are unavailable'], 400);
    }

    return response()->json([
        'message' => 'Seats selected',
        'seats' => $requested
    ]);
}

}
