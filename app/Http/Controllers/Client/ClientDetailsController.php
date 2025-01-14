<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\BaseController;
use App\Models\ClientDetail;
use App\Repositories\ClientDetailRepository;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Inertia\Inertia;
use Throwable;

class ClientDetailsController extends BaseController
{
    protected ClientDetailRepository $clientDetailRepository;
    protected UserRepository $userRepository;

    public function __construct(ClientDetailRepository $clientDetailRepository ,UserRepository $userRepository)
    {
        $this->clientDetailRepository = $clientDetailRepository;
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $users = $this->userRepository->getAll(['users']);
        $clientDetails = $this->clientDetailRepository->getPaginate(10);
        $users = $this->userRepository->getAll();
        
        return Inertia::render('ClientDetails/Index', compact('users','clientDetails'));
    }

    public function show(ClientDetail $clientDetail)
    {
       
        return Inertia::render('ClientDetails/Show', compact('clientDetail'));
    }

    public function create()
    {
        $clientDetails = $this->userRepository->getAllByRole('client');
        return Inertia::render('User/Partials/Create', compact('clientDetails'));
    }

    public function store(StoreClientRequest $request)
    {    
        DB::beginTransaction();
        try {
            $this->clientDetailRepository->store($request->getInsertTableField2());
            $this->userRepository->store($request->getInsertTableField());
            
            DB::commit();
            return redirect()->route('client.index')->with('success', 'Client Detail Added Successfully');
           
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('clientDetails.create')->with('error', $e->getMessage());
        }
    }

    public function edit(ClientDetail $clientDetail): View
    {
        $clientDetail = $this->clientDetailRepository->getById($clientDetail->id);
        return view('clientDetails.edit', compact('clientDetail'));
    }

    public function update(ClientDetail $clientDetail, UpdateClientRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->clientDetailRepository->update($clientDetail->id, $request->getInsertableFields());
            DB::commit();
            return redirect()->route('clientDetails.index')->with('success', 'Client Detail Updated Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('clientDetails.edit', $clientDetail->id)->with('error', $e->getMessage());
        }
    }

    public function destroy(ClientDetail $clientDetail)
    {
        DB::beginTransaction();
        try {
            $this->clientDetailRepository->destroy($clientDetail->id);
            DB::commit();
            return redirect()->route('clientDetails.index')->with('success', 'Client Detail Deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('clientDetails.index')->with('error', $e->getMessage());
        }
    }
}
