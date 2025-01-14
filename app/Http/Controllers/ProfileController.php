<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProfileController extends Controller
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        
        $this->userRepository = $userRepository;
        
    }
    public function index()
    {
        $user =  $this->userRepository->getAuthenticatedUser();
        return Inertia::render('Profile/Index', compact('user'));
    }
  
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $request->user(),
        ]);
    }

   
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        DB::beginTransaction();
        try {
           
            $user = $request->user();
            $user->fill($request->validated());
            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }
            DB::commit();
            return redirect(route('users.index'))->with('success', 'Updated Succesfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect(route('profile.index'))->with('error', $e->getMessage());
        }
      
        

       
        
        $user->save();

        return Redirect::route('users.index')->with('success', 'Profile updated successfully!');
    }

   
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
