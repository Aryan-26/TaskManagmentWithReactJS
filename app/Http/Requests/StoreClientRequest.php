<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreClientRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

   

    public function rules(): array
    {
       
        
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string', 
            'role' => 'required',
            'company_name'=>'required',
            'contact_number'=>'required|numeric|digits:10',

        ];
    }

    public function messages(): array
{
    return [
     
        'name.required' => 'The name field is required.',
        'name.string' => 'The name must be a valid string.',
        'name.max' => 'The name cannot exceed 255 characters.',


        'email.required' => 'The email field is required.',
        'email.email' => 'Please provide a valid email address.',
        'email.unique' => 'This email is already associated with another user.',

        
        'password.required' => 'The password field is required.',
        'password.string' => 'The password must be a valid string.',
        'password.min' => 'The password must be at least 8 characters long.',

        
        'role.required' => 'The role field is required.',

        
        'company_name.required' => 'The company name field is required.',

        
        'contact_number.required' => 'The contact number field is required.',
        'contact_number.numeric' => 'The contact number must be a valid number.',
        'contact_number.digits' => 'The contact number must be exactly 10 digits.',
    ];
}


    
    public function getInsertTableField(): array
    {
        return [
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'password' => bcrypt($this->input('password')), 
            'role' => $this->input('role'),
            'created_by' => Auth::user()->id,
            'updated_by' => null,
        ];
    }

    public function getInsertTableField2(): array
    {
        
        $lastUser = User::latest()->first();
        $id = $lastUser->id;
        return [
            'id'=>Str::uuid(),
            'user_id'=>$id,
            'company_name'=>$this->input('company_name'),
            'contact_number'=>$this->input('contact_number'),
        ];
    }
}
