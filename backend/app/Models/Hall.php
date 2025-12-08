<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    protected $fillable = ['name','total_rows','total_columns','status'];

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    public function showtimes()
    {
        return $this->hasMany(Showtime::class);
    }
}
