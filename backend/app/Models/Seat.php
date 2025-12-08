<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $fillable = ['hall_id','row_label','seat_number'];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }

    public function bookingSeats()
    {
        return $this->hasMany(BookingSeat::class);
    }
}
