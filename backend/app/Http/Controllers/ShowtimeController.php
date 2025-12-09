<?php

namespace App\Http\Controllers;

use App\Models\BookingSeat;
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
    public function getSeats($id)
{
    $showtime = Showtime::with('hall.seats')->findOrFail($id);

    $unavailableSeats = BookingSeat::query()
        ->join('bookings', 'bookings.id', '=', 'booking_seats.booking_id')
        ->where('bookings.showtime_id', $id)
        ->pluck('seat_id')
        ->toArray();

    return $showtime->hall->seats->map(function ($seat) use ($unavailableSeats) {
        return [
            'id' => $seat->id,
            'row_label' => $seat->row_label,
            'seat_number' => $seat->seat_number,
            'is_available' => !in_array($seat->id, $unavailableSeats),
        ];
    });
}

}
