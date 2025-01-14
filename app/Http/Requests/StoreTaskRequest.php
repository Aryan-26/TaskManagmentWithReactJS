<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTaskRequest extends FormRequest
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
            'status' => 'required|in:pending,in_progress,completed',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => '|exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The task name is required.',
            'name.string' => 'The task name must be a valid string.',
            'name.max' => 'The task name cannot exceed 255 characters.',
            'description.string' => 'The description must be a valid string.',
            'status.required' => 'The status is required.',
            'status.in' => 'The status must be one of the following: pending, in progress, or completed.',
            'project_id.required' => 'Please select a project.',
            'project_id.exists' => 'The selected project is invalid.',
            'assigned_to.exists' => 'The selected user for assignment is invalid.',
            'start_date.required' => 'The start date is required.',
            'start_date.date' => 'The start date must be a valid date.',
            'end_date.required' => 'The end date  is required..',
            'end_date.date' => 'The end date must be a valid date.',
            'end_date.after_or_equal' => 'The end date must be the same as or later than the start date.',
        ];
    }

  
    public function getInsertableFields(): array
    {
        return [
            'name' => $this->input('name'),
            'description' => $this->input('description'),
            'status' => $this->input('status'),
            'project_id' => $this->input('project_id'),
            'assigned_to' => $this->input('assigned_to'),
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
            'start_date' => $this->input('start_date'),
            'end_date' => $this->input('end_date'),
        ];
    }
}
