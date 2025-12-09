<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class BookingSeat extends Model
{
    protected $fillable = ['booking_id','showtime_id','seat_id'];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function showtime()
    {
        return $this->belongsTo(Showtime::class);
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }
        public $timestamps = false; // disables automatic timestamps

}
