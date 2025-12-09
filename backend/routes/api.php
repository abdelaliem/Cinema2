<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    MovieController,
    HallController,
    SeatController,
    ShowtimeController,
    UserController,
    BookingController
};

Route::apiResource('movies', MovieController::class);
Route::apiResource('halls', HallController::class);
Route::apiResource('seats', SeatController::class);
Route::apiResource('showtimes', ShowtimeController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('bookings', BookingController::class);
Route::get('movies/{id}/showtimes', [MovieController::class, 'getShows']);
Route::get('showtimes/{Id}/seats', [ShowtimeController::class, 'getSeats']);