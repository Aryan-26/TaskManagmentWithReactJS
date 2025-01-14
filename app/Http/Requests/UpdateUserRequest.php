<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpdateUserRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return Auth::check() && Auth::user();
    }

   
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' =>
                'required|
                email',
                Rule::unique('users')->ignore(route('users.index'))
            ,
            'role' => ['required', new Enum(UserRole::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The name field is mandatory.',
            'name.string' => 'The name must be a valid string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            
            'email.required' => 'The email field is mandatory.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already taken by another user.',
            
            'role.required' => 'The role field is mandatory.',
            'role.in' => 'The role must be one of the following: admin, employee, or client.',
        ];
    }
   
    public function getUpdateableFields(): array
    {
        return [
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'role' => $this->input('role'),
            'updated_by' => Auth::user()->id,
        ];

        
    }
}