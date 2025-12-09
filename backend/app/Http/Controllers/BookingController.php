<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\User;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::all();
    }

    public function store(Request $request)
    {
        $user = User::firstOrCreate(
            ['email' => $request->user_email],
            ['name' => $request->user_name, 'phone' => $request->user_phone]
        );

        $booking = new Booking();
        $booking->user_id = $user->id;
        $booking->showtime_id = $request->showtime_id;
        $booking->total_price = $request->total_price;
        $booking->save();
        foreach ($request->seat_ids as $seat_id) {
            $booking_seat = new BookingSeat();
            $booking_seat->booking_id = $booking->id;
            $booking_seat->seat_id = $seat_id;
            $booking_seat->showtime_id = $request->showtime_id;
            $booking_seat->save();
        }
        return $booking;
    }

    public function show($id)
    {
        return Booking::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($request->all());
        return $booking;
    }

    public function destroy($id)
    {
        Booking::destroy($id);
        return response()->json(['message' => 'Booking deleted']);
    }
}
