<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class StoreUserRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return Auth::check() && Auth::user();
    }

  
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'email' => 'required|email',Rule::unique('users')->ignore(route('users.index')),
            'role' => ['required', new Enum(UserRole::class)], 
            'password' => 'required|string|min:8|confirmed',
            
            
            // 'name' => 'required|string|max:255',  
            // 'email' => 'required|email',  
            // 'role' => 'required|in:admin,employee,client',
            // 'password' => 'required|string|min:8', 
        ];
    }
    

    
    public function getInsertableFields(): array
    {
        return [
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'password' => bcrypt($this->input('password')),
            'role' => $this->input('role'),
            'created_by' => Auth::user()->id,
            'updated_by' => Auth::user()->id,
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'Please provide a name for the user.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name cannot exceed 255 characters.',
            
            'email.required' => 'An email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already taken.',
            
            'role.required' => 'Please select a role for the user.',
            'role.in' => 'The selected role is invalid. Please choose from admin, employee, or client.',
            
            'password.required' => 'A password is required.',
            'password.string' => 'The password must be a string.',
            'password.min' => 'The password must be at least 8 characters long.',
            'password.confirmed' => 'The password confirmation does not match.',
            
        ];
    }
}
