<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\StoreClientRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Inertia\Inertia;
use Throwable;

class UserController extends Controller
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        
        $this->userRepository = $userRepository;
        // $this->\App\Http\Middleware\RoleMiddleware('role:admin')->except(['index', 'show']);
    }

    public function index()
    {
        $states = UserRole::options();
        $users = $this->userRepository->getPaginate(7);
        // dd($users);
        return Inertia::render('User/Index', compact('states','users'));
        
    }

    public function show(User $user)
    {

        $user = $this->userRepository->getById($user->id);
        return Inertia::render('User/Show', compact('user'));
    }

    public function create()
    {
        $states = UserRole::options();
        return Inertia::render('User/Create',compact('states'));
    }

    public function store(StoreUserRequest $request)
    {
    //    dd("hjvuiv");
        DB::beginTransaction();
        try {
            $this->userRepository->store($request->getInsertableFields());
            DB::commit();
            return redirect()->route('users.index')->with('success', 'User Added Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('users.create')->with('error', $e->getMessage());
        }
    }

    public function edit(User $user)
    {
        $user = $this->userRepository->getById($user->id);
        return Inertia::render('User/Edit', compact('user'));
    }

    public function update(UpdateUserRequest $request,User $user)
    {
        // dd('eguguig');
        DB::beginTransaction();
        try {
            $this->userRepository->update($user->id, $request->getUpdateableFields());
            DB::commit();
            return redirect()->route('users.index')->with('success', 'User Updated Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('users.edit', $user->id)->with('error', $e->getMessage());
        }
    }

    public function destroy(User $user)
    {
        DB::beginTransaction();
        try {
            $this->userRepository->destroy($user->id);
            DB::commit();
            return redirect()->route('users.index')->with('success', 'User Deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('users.index')->with('error', $e->getMessage());
        }
    }
}
