<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return true;
    }

   
    // public function rules(): array
    // {
    //     return [
    //         'company_name'=>'required',
    //         'contact_number'=>'required|numeric|digits:10',
    //     ];
    // }

    // public function getInsertTableField(){
    //     return [
    //         'user_id'=>$this->input('user_id'),
    //         'company_name'=>$this->input('company_name'),
    //         'contact_number'=>$this->input('contact_number'),
    //     ];
    // }

    public function rules(): array
    {
        return [
           'name'=>'required',
            'email'=>'required',
            'company_name'=>'required',
            'contact_number'=>'required',
        ];
    }

    
    public function getInsertTableFiel1(): array
    {
        return [
            'name' => $this->input('name'),
            'email' => $this->input('email'),Rule::unique('users')->ignore(route('admin.client.index')),
            'created_by' => $this->input('created_by'),
            'updated_by' => Auth::id(),
        ];
    }
    
    public function getInsertTableField2(): array
    {        
        return [
            'company_name'=>$this->input('company_name'),
            'user_id'=>$this->input('user_id'),
            'contact_number'=>$this->input('contact_number'),
        ];
    }
    // public function editname(){
    //     return [
    //         'name'=>$this->input('name')
    //     ];
    // }
}
