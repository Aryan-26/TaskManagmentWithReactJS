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
    
    
    public function index()
    {   
        
        $clients=$this->userRepository->getAllByRole('client');
        $clientDetails = $this->clientDetailRepository->getAll();
        return Inertia::render('Client/Index' , compact('clients','clientDetails'));
    }
    
    //hjgjg
    public function create()
    {
        $clientDetails = $this->userRepository->getAllByRole('client');
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
            return redirect()->route('clientDetails.create')->with('error', $e->getMessage());
        }
    }
    
    
//     public function show(ClientDetail $client)
//     {   
//         // $clients=$this->userRepository->getAllByRole('client');
//         $clientDetails = $this->clientDetailRepository->getById($client->getKey());
//  // Assuming the client is authenticated
// //  $client = $this->userRepository->getAllByRole('client',['id','name','role']);
//     $projects = $this->projectRepository->getProjectsByUser($client->id);
//     // dd($projects);
//     return Inertia::render('Client/Dashboard', compact('projects'));
//         // return Inertia::render('Client/Dashboard', compact('clients','clientDetails'));
//     }

// public function show(ClientDetail $clientDetail)
// {   
  
//     // $clientDetails = $this->clientDetailRepository->getById(Auth::id());    
//     $project = $this->projectRepository->getProjectsByClient(Auth::id());
//     $projects = $this->projectRepository->getProjectsByClient(Auth::id());
//     $projectsCount = $this->projectRepository->getProjectsByClient(Auth::id())->count();
//     $tasksCount = $this->taskRepository->getTasksByClient(Auth::id())->count();
//     $tasks = $this->taskRepository->getTasksByClient(Auth::id());
//     $tasks = $this->taskRepository->getTasksByClient(Auth::id());
//     // dd($tasks);
//     return Inertia::render('Client/Dashboard', compact('tasksCount','tasks','projectsCount','projects'));
// }


public function show()
{
    // Fetch the authenticated user's ID
    $projects = $this->projectRepository->getProjectsByClient(Auth::id());
    $projectsCount = $projects->count();
    
    $tasks = $this->taskRepository->getTasksByClient(Auth::id());
    $tasksCount = $tasks->count();

    // Render the Inertia view with the necessary data
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
