<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProjectRequest extends FormRequest
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
            'client_id' => 'required|exists:users,id', 
            'employee_ids' => 'required|array',
            'employee_ids.*' => 'exists:users,id',
            'start_date' => 'required|date', 
            'end_date' => 'nullable|date|after_or_equal:start_date', 
        ];
    }

    public function getInsertableFields(): array
    {
        return [
            'name' => $this->input('name'),
            'description' => $this->input('description'),   
            'client_id' => $this->input('client_id'),
            'updated_by' => Auth::user()->id, 
            'start_date' => $this->input('start_date'),
            'end_date' => $this->input('end_date'),
        ];
    }
}
