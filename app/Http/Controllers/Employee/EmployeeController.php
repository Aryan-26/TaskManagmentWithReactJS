<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\BaseController;
use App\Models\Task;
use Illuminate\Routing\Controller;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Repositories\TaskRepository;
use App\Repositories\ProjectRepository;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends BaseController
{
    protected UserRepository $userRepository;
    protected TaskRepository $taskRepository;
    protected ProjectRepository $projectRepository;
    public function __construct(UserRepository $userRepository, TaskRepository $taskRepository,ProjectRepository $projectRepository)
    {
        $this->userRepository=$userRepository;
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
    }
    public function show(){
        return Inertia::render('Employee/Dashboard');
    }
    
    public function index(Request $request){

       
       $employeeId = $request->user()->id;

       
       $tasks = $this->taskRepository->getTasksByEmployee($employeeId);

       
       $projects = $this->projectRepository->getProjectsByUser($employeeId);

       return Inertia::render('Employee/Dashboard', compact('tasks', 'projects'));
    }
  
}
