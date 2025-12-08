<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'user_id' => ['required','exists:users,id'],
            'showtime_id' => ['required','exists:showtimes,id'],
            'seat_ids' => ['required','array','min:1'],
            'seat_ids.*' => ['integer','exists:seats,id'],
        ];
    }
}
