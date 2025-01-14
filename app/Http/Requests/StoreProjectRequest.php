<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreProjectRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return true;  
    }

    
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'client_id' => 'nullable|string',
            'start_date' => 'required|date',
              'employee_ids' => 'required|array',
            'employee_ids.*' => 'exists:users,id|string',
                'end_date' => 'nullable|date|after_or_equal:start_date',
            ];
        }
        

    public function getInsertableFields(): array
    {
        return [
            'name' => $this->input('name'),
            'description' => $this->input('description'),   
            'client_id' => $this->input('client_id'),
            'created_by' => Auth::user()->id,  
            'updated_by' => Auth::user()->id, 
            'start_date' => $this->input('start_date'),
            'end_date' => $this->input('end_date'),
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The project name is required.',
            'name.string' => 'The project name must be a valid string.',
            'name.max' => 'The project name cannot exceed 255 characters.',
            'description.string' => 'The description must be a valid string.',
            'client_id.string' => 'The client ID must be a valid string.',
            'start_date.required' => 'The start date is required.',
            'start_date.date' => 'The start date must be a valid date.',
            'end_date.required' => 'The end date is required.',
            'end_date.date' => 'The end date must be a valid date.',
            'end_date.after_or_equal' => 'The end date must be the same as or later than the start date.',
        ];
    }
}
