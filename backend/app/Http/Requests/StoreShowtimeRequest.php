<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class StoreShowtimeRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'movie_id' => ['required','exists:movies,id'],
            'hall_id'  => ['required','exists:halls,id'],
            'start_time' => ['required','date'],
            'price' => ['required','numeric','min:0'],
        ];
    }

    public function prepareForValidation()
    {
        if ($this->has('start_time') && !$this->has('end_time')) {
            // end_time will be calculated in controller using movie duration
        }
    }
}
