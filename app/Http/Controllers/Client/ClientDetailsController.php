<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\BaseController;
use App\Models\ClientDetail;
use App\Repositories\ClientDetailRepository;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\User;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Inertia\Inertia;
use Throwable;

class ClientDetailsController extends BaseController
{
    protected ClientDetailRepository $clientDetailRepository;
    protected UserRepository $userRepository;
    protected TaskRepository $taskRepository;
    protected ProjectRepository $projectRepository;

    public function __construct(ClientDetailRepository $clientDetailRepository ,UserRepository $userRepository,TaskRepository $taskRepository,ProjectRepository $projectRepository)
    {
        $this->clientDetailRepository = $clientDetailRepository;
        $this->userRepository = $userRepository;
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
    }
    

    public function create()
    {
        return Inertia::render('User/Partials/Create');
    }

    public function show(ClientDetail $clientDetail,$id)
    {
        $clientDetails = $this->clientDetailRepository->getById($id,['user']);
        $projects = $this->projectRepository->getProjectsByClient($clientDetail->id);
        return Inertia::render('ClientDetails/Show', compact('clientDetails','projects'));
    }
    
    public function store(StoreClientRequest $request)
    {    
        DB::beginTransaction();
        try {
            $this->clientDetailRepository->store($request->getInsertTableField2());
            $this->userRepository->store($request->getInsertTableField());
            
            DB::commit();
            return $this->sendRedirectResponse(route('client.index'), 'Client Detail Added Successfully');
           
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('client-details.create')->with('error', $e->getMessage());
        }
    }

}
