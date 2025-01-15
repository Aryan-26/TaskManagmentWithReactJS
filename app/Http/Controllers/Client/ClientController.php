<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\BaseController;
use App\Models\ClientDetail;
use App\Models\User;
use App\Repositories\ClientDetailRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use Illuminate\Routing\Controller;
use App\Repositories\UserRepository;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;

class ClientController extends BaseController
{
   protected $userRepository;
   protected $clientDetailRepository;
   protected $projectRepository;
   protected $taskRepository;
   
    function __construct(TaskRepository $taskRepository,ProjectRepository $projectRepository,UserRepository $userRepository,ClientDetailRepository $clientDetailRepository){
        $this->projectRepository = $projectRepository;
        $this->clientDetailRepository = $clientDetailRepository;
        $this->userRepository = $userRepository;
        $this->taskRepository = $taskRepository;
    }
    
    
    public function index(ClientDetail $clientDetail)
    {   
        
        $clients=$this->userRepository->getAllByRole('client');


        return Inertia::render('Client/Index' , compact('clients'));
    }
    
    //hjgjg
    public function create()
    {
        return Inertia::render('User/Partials/Create', compact('clientDetails'));
    }
    
  
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $this->clientDetailRepository->store($request->getInsertTableField2());
            $this->userRepository->store($request->getInsertTableField());
            
            DB::commit();
            return redirect()->route('client.index')->with('success', 'Client Detail Added Successfully');
           
        } catch (Throwable $e) {
            DB::rollBack();
            return redirect()->route('client-details.create')->with('error', $e->getMessage());
        }
    }
    
    



public function show()
{
    $projects = $this->projectRepository->getProjectsByClient(Auth::id());
    $projectsCount = $projects->count();
    
    $tasks = $this->taskRepository->getTasksByClient(Auth::id());
    $tasksCount = $tasks->count();

    return Inertia::render('Client/Dashboard', compact('tasksCount', 'tasks', 'projectsCount', 'projects'));
}



   
    public function edit(string $id)
    {
        
    }

    
    public function update(Request $request, string $id)
    {
        
    }

    
    public function destroy(string $id)
    {
        
    }
}
