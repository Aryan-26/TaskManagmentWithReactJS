<?php

namespace App\Http\Requests;

use App\Enums\StatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class UpdateTaskRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return true;
    }

   
    public function rules(): array
    {
        $taskId = $this->route('task')->id; 
    
        // return [
        //     'name' => 'required|string|max:255',
        //     'description' => 'nullable|string',
        //     'status' => ['required', new Enum(StatusEnum::class)], 
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date|after_or_equal:start_date',
        //     'assigned_to' => 'array|required',
        //     'project_id' => 'required|exists:projects,id'
        // ];

        return [
            'name' => 'nullable|string|max:255', // Allow name to be nullable during update
            'description' => 'nullable|string', // Description remains nullable
            'status' => ['nullable', new Enum(StatusEnum::class)], // Allow status to be nullable
            'start_date' => 'nullable|date', // Make start_date optional
            'end_date' => 'nullable|date|after_or_equal:start_date', // Ensure end_date is after start_date if provided
            'project_id' => 'sometimes|exists:projects,id', // Use sometimes to make it optional but valid if present
        ];
        
    }
    

    
    public function getUpdateableFields(): array
    {
        return [
            'name' => $this->input('name'),
            'description' => $this->input('description'),
            'status' => $this->input('status'),
            'project_id' => $this->input('project_id'),
            'assigned_to' => $this->input('assigned_to'),
            'updated_by' => Auth::id(),
            'start_date' => $this->input('start_date'),
            'end_date' => $this->input('end_date'),
        ];
        
    }
}
